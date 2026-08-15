import { desc, eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import {
  InsertUser,
  exerciseAnswers,
  learnerProfiles,
  lessonProgress,
  users,
  vocabularyReviews,
  writingEntries,
} from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

export async function ensureLearnerProfile(userId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database unavailable");

  await db.insert(learnerProfiles).values({ userId }).onDuplicateKeyUpdate({
    set: { lastActiveAt: new Date() },
  });

  const result = await db.select().from(learnerProfiles).where(eq(learnerProfiles.userId, userId)).limit(1);
  return result[0];
}

export async function getLearningSnapshot(userId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database unavailable");

  const [profile] = await db.select().from(learnerProfiles).where(eq(learnerProfiles.userId, userId)).limit(1);
  const progress = await db.select().from(lessonProgress).where(eq(lessonProgress.userId, userId));
  const reviews = await db.select().from(vocabularyReviews).where(eq(vocabularyReviews.userId, userId));
  const entries = await db
    .select()
    .from(writingEntries)
    .where(eq(writingEntries.userId, userId))
    .orderBy(desc(writingEntries.createdAt))
    .limit(8);

  return { profile, progress, reviews, entries };
}

export async function savePlacementLevel(userId: number, level: string) {
  const db = await getDb();
  if (!db) throw new Error("Database unavailable");

  await db.insert(learnerProfiles).values({ userId, selectedLevel: level, lastActiveAt: new Date() }).onDuplicateKeyUpdate({
    set: { selectedLevel: level, lastActiveAt: new Date() },
  });
}

export async function completeLessonForUser(input: {
  userId: number;
  lessonId: string;
  score: number;
  correctAnswers: number;
  attempts: number;
  xpAward: number;
}) {
  const db = await getDb();
  if (!db) throw new Error("Database unavailable");

  const existing = await db
    .select()
    .from(lessonProgress)
    .where(eq(lessonProgress.userId, input.userId))
    .limit(100);
  const alreadyCompleted = existing.some(item => item.lessonId === input.lessonId && item.status === "completed");
  const awardedXp = alreadyCompleted ? 0 : input.xpAward;

  await db.insert(lessonProgress).values({
    userId: input.userId,
    lessonId: input.lessonId,
    status: "completed",
    score: input.score,
    correctAnswers: input.correctAnswers,
    attempts: input.attempts,
    xpEarned: awardedXp,
    completedAt: new Date(),
  }).onDuplicateKeyUpdate({
    set: {
      status: "completed",
      score: input.score,
      correctAnswers: input.correctAnswers,
      attempts: input.attempts,
      completedAt: new Date(),
    },
  });

  if (awardedXp > 0) {
    const profile = await ensureLearnerProfile(input.userId);
    await db.update(learnerProfiles).set({
      xp: profile.xp + awardedXp,
      currentStreak: Math.max(1, profile.currentStreak),
      lastActiveAt: new Date(),
    }).where(eq(learnerProfiles.userId, input.userId));
  }

  return { awardedXp, alreadyCompleted };
}

export async function saveWritingEntry(input: { userId: number; lessonId?: string; level: string; entryText: string }) {
  const db = await getDb();
  if (!db) throw new Error("Database unavailable");

  await db.insert(writingEntries).values(input);
}

export async function recordExerciseAnswer(input: {
  userId: number;
  lessonId: string;
  questionId: string;
  userAnswer: string;
  isCorrect: boolean;
}) {
  const db = await getDb();
  if (!db) throw new Error("Database unavailable");

  await db.insert(exerciseAnswers).values({
    userId: input.userId,
    lessonId: input.lessonId,
    questionId: input.questionId,
    userAnswer: input.userAnswer,
    isCorrect: input.isCorrect ? 1 : 0,
  });
}

export async function recordVocabularyReview(input: {
  userId: number;
  vocabularyId: string;
  category: string;
  rating: number;
}) {
  const db = await getDb();
  if (!db) throw new Error("Database unavailable");

  const intervalDays = input.rating >= 4 ? 7 : input.rating >= 3 ? 3 : 1;
  const nextReviewAt = new Date(Date.now() + intervalDays * 24 * 60 * 60 * 1000);
  await db.insert(vocabularyReviews).values({
    userId: input.userId,
    vocabularyId: input.vocabularyId,
    category: input.category,
    reviewStage: input.rating,
    intervalDays,
    nextReviewAt,
    lastReviewedAt: new Date(),
  }).onDuplicateKeyUpdate({
    set: {
      reviewStage: input.rating,
      intervalDays,
      nextReviewAt,
      lastReviewedAt: new Date(),
    },
  });
}
