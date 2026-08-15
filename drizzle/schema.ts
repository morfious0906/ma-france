import {
  index,
  int,
  mysqlEnum,
  mysqlTable,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/** One durable learner profile per authenticated Ma France user. */
export const learnerProfiles = mysqlTable(
  "learner_profiles",
  {
    id: int("id").autoincrement().primaryKey(),
    userId: int("userId").notNull(),
    selectedLevel: varchar("selectedLevel", { length: 8 }).default("A1").notNull(),
    xp: int("xp").default(0).notNull(),
    currentStreak: int("currentStreak").default(0).notNull(),
    lastActiveAt: timestamp("lastActiveAt"),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  },
  table => ({
    userUnique: uniqueIndex("learner_profiles_user_unique").on(table.userId),
  }),
);

/** Completion state for a lesson; the unique key prevents duplicate rewards. */
export const lessonProgress = mysqlTable(
  "lesson_progress",
  {
    id: int("id").autoincrement().primaryKey(),
    userId: int("userId").notNull(),
    lessonId: varchar("lessonId", { length: 96 }).notNull(),
    status: mysqlEnum("status", ["started", "completed"]).default("started").notNull(),
    score: int("score").default(0).notNull(),
    correctAnswers: int("correctAnswers").default(0).notNull(),
    attempts: int("attempts").default(0).notNull(),
    xpEarned: int("xpEarned").default(0).notNull(),
    completedAt: timestamp("completedAt"),
    updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  },
  table => ({
    userLessonUnique: uniqueIndex("lesson_progress_user_lesson_unique").on(table.userId, table.lessonId),
    userIndex: index("lesson_progress_user_index").on(table.userId),
  }),
);

/** Individual answer records allow learners to revisit mistakes without exposing data between users. */
export const exerciseAnswers = mysqlTable(
  "exercise_answers",
  {
    id: int("id").autoincrement().primaryKey(),
    userId: int("userId").notNull(),
    lessonId: varchar("lessonId", { length: 96 }).notNull(),
    questionId: varchar("questionId", { length: 96 }).notNull(),
    userAnswer: text("userAnswer").notNull(),
    isCorrect: int("isCorrect").default(0).notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
  },
  table => ({
    userLessonIndex: index("exercise_answers_user_lesson_index").on(table.userId, table.lessonId),
  }),
);

/** Learner-authored practice lines retained in the personal notebook. */
export const writingEntries = mysqlTable(
  "writing_entries",
  {
    id: int("id").autoincrement().primaryKey(),
    userId: int("userId").notNull(),
    lessonId: varchar("lessonId", { length: 96 }),
    level: varchar("level", { length: 8 }).default("A1").notNull(),
    entryText: text("entryText").notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
  },
  table => ({
    userCreatedIndex: index("writing_entries_user_created_index").on(table.userId, table.createdAt),
  }),
);

/** Spaced-review metadata for curriculum vocabulary, scoped to a learner. */
export const vocabularyReviews = mysqlTable(
  "vocabulary_reviews",
  {
    id: int("id").autoincrement().primaryKey(),
    userId: int("userId").notNull(),
    vocabularyId: varchar("vocabularyId", { length: 96 }).notNull(),
    category: varchar("category", { length: 48 }).notNull(),
    reviewStage: int("reviewStage").default(0).notNull(),
    intervalDays: int("intervalDays").default(1).notNull(),
    nextReviewAt: timestamp("nextReviewAt"),
    lastReviewedAt: timestamp("lastReviewedAt"),
    updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  },
  table => ({
    userVocabularyUnique: uniqueIndex("vocabulary_reviews_user_vocab_unique").on(table.userId, table.vocabularyId),
    dueReviewsIndex: index("vocabulary_reviews_due_index").on(table.userId, table.nextReviewAt),
  }),
);
