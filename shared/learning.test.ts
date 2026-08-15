import { describe, expect, it } from "vitest";
import { calculatePlacementLevel, calculateProgress, reviewIntervalForRating } from "./learning";

describe("learning helpers", () => {
  it("maps placement scores to a supported learner level", () => {
    expect(calculatePlacementLevel(0, 3)).toBe("A1");
    expect(calculatePlacementLevel(2, 3)).toBe("A2");
    expect(calculatePlacementLevel(3, 3)).toBe("B1");
  });

  it("calculates a bounded progress percentage", () => {
    expect(calculateProgress(2, 6)).toBe(33);
    expect(calculateProgress(8, 6)).toBe(100);
  });

  it("schedules vocabulary review intervals by rating", () => {
    expect(reviewIntervalForRating(2)).toBe(1);
    expect(reviewIntervalForRating(3)).toBe(3);
    expect(reviewIntervalForRating(5)).toBe(7);
  });
});

