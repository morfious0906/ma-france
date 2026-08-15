import { COOKIE_NAME } from "@shared/const";
import { z } from "zod";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import {
  completeLessonForUser,
  ensureLearnerProfile,
  getLearningSnapshot,
  recordExerciseAnswer,
  recordVocabularyReview,
  savePlacementLevel,
  saveWritingEntry,
} from "./db";
import { protectedProcedure, publicProcedure, router } from "./_core/trpc";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),
  learning: router({
    snapshot: protectedProcedure.query(async ({ ctx }) => {
      await ensureLearnerProfile(ctx.user.id);
      return getLearningSnapshot(ctx.user.id);
    }),
    savePlacement: protectedProcedure
      .input(z.object({ level: z.enum(["A1", "A2", "B1", "B2", "C1"]) }))
      .mutation(async ({ ctx, input }) => {
        await savePlacementLevel(ctx.user.id, input.level);
        return { success: true };
      }),
    completeLesson: protectedProcedure
      .input(z.object({
        lessonId: z.string().min(1).max(96),
        score: z.number().int().min(0).max(100),
        correctAnswers: z.number().int().min(0),
        attempts: z.number().int().min(1),
      }))
      .mutation(({ ctx, input }) => completeLessonForUser({ ...input, userId: ctx.user.id, xpAward: 120 })),
    recordAnswer: protectedProcedure
      .input(z.object({
        lessonId: z.string().min(1).max(96),
        questionId: z.string().min(1).max(96),
        userAnswer: z.string().min(1).max(500),
        isCorrect: z.boolean(),
      }))
      .mutation(async ({ ctx, input }) => {
        await recordExerciseAnswer({ ...input, userId: ctx.user.id });
        return { success: true };
      }),
    saveWriting: protectedProcedure
      .input(z.object({ lessonId: z.string().max(96).optional(), level: z.string().max(8), entryText: z.string().min(1).max(1500) }))
      .mutation(async ({ ctx, input }) => {
        await saveWritingEntry({ ...input, userId: ctx.user.id });
        return { success: true };
      }),
    reviewVocabulary: protectedProcedure
      .input(z.object({ vocabularyId: z.string().min(1).max(96), category: z.string().min(1).max(48), rating: z.number().int().min(1).max(5) }))
      .mutation(async ({ ctx, input }) => {
        await recordVocabularyReview({ ...input, userId: ctx.user.id });
        return { success: true };
      }),
  }),
});

export type AppRouter = typeof appRouter;
