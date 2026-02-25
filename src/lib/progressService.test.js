import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/firestore.js", () => ({
  createOrMergeUserProfile: vi.fn(),
  getUserProfile: vi.fn(),
  updateLessonProgress: vi.fn(),
}));

import { buildLessonState, getLocalLessonsProgress, saveLocalLessonsProgress } from "@/lib/progressService.js";

describe("progressService", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("builds locked lessons after first incomplete lesson", () => {
    const state = buildLessonState(["head-shape"]);
    expect(state[0].completed).toBe(true);
    expect(state[1].locked).toBe(false);
    expect(state[2].locked).toBe(true);
  });

  it("persists and reads local lesson progress", () => {
    const initial = buildLessonState(["head-shape", "eyes"]);
    saveLocalLessonsProgress(initial);
    const loaded = getLocalLessonsProgress();
    expect(loaded?.filter((l) => l.completed).length).toBe(2);
  });
});

