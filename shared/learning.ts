export const CEFR_LEVELS = ["A1", "A2", "B1", "B2", "C1"] as const;
export type CefrLevel = (typeof CEFR_LEVELS)[number];

export function calculatePlacementLevel(score: number, total: number): CefrLevel {
  const ratio = total === 0 ? 0 : score / total;
  if (ratio >= 0.9) return "B1";
  if (ratio >= 0.65) return "A2";
  return "A1";
}

export function calculateProgress(completedLessonCount: number, totalLessonCount: number) {
  if (totalLessonCount <= 0) return 0;
  return Math.min(100, Math.round((completedLessonCount / totalLessonCount) * 100));
}

export function reviewIntervalForRating(rating: number) {
  if (rating >= 4) return 7;
  if (rating >= 3) return 3;
  return 1;
}
