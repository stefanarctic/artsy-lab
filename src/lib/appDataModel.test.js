import { describe, expect, it } from "vitest";
import {
  LESSON_ORDER,
  getDefaultUserProfile,
  normalizeCompletedLessons,
} from "@/lib/appDataModel.js";

describe("appDataModel", () => {
  it("creates a default profile with expected baseline fields", () => {
    const profile = getDefaultUserProfile({ email: "a@b.com" });
    expect(profile.email).toBe("a@b.com");
    expect(profile.totalArtworks).toBe(0);
    expect(profile.totalLessons).toBe(0);
    expect(profile.lastLessonId).toBe(LESSON_ORDER[0]);
  });

  it("normalizes completed lessons and removes duplicates/invalid values", () => {
    const normalized = normalizeCompletedLessons(["eyes", "eyes", "invalid", "nose"]);
    expect(normalized).toEqual(["eyes", "nose"]);
  });
});

