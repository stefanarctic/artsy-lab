import {
  createOrMergeUserProfile,
  getUserProfile,
  updateLessonProgress,
} from "@/lib/firestore.js";
import { LESSON_ORDER, normalizeCompletedLessons } from "@/lib/appDataModel.js";

const LOCAL_LESSONS_KEY = "lessons";

export const buildLessonState = (completedLessons) => {
  const completedSet = new Set(normalizeCompletedLessons(completedLessons));
  return LESSON_ORDER.map((lessonId, index) => {
    const previousLessonId = LESSON_ORDER[index - 1];
    const locked = index > 0 && !completedSet.has(previousLessonId);
    return {
      id: lessonId,
      completed: completedSet.has(lessonId),
      locked,
    };
  });
};

export const getLocalLessonsProgress = () => {
  try {
    const raw = localStorage.getItem(LOCAL_LESSONS_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return null;

    const completedLessons = parsed
      .filter((lesson) => lesson?.completed)
      .map((lesson) => lesson.id);

    return buildLessonState(completedLessons);
  } catch {
    return null;
  }
};

export const saveLocalLessonsProgress = (lessonState) => {
  try {
    localStorage.setItem(LOCAL_LESSONS_KEY, JSON.stringify(lessonState));
  } catch {
    // Ignore local cache write errors.
  }
};

export const getUserLessonState = async (userId) => {
  if (!userId) {
    const localProgress = getLocalLessonsProgress();
    return localProgress || buildLessonState([]);
  }

  const profile = await getUserProfile(userId);
  const completedLessons = normalizeCompletedLessons(profile?.completedLessons);
  const lessonState = buildLessonState(completedLessons);
  saveLocalLessonsProgress(lessonState);
  return lessonState;
};

export const migrateLocalProgressToCloud = async (userId) => {
  if (!userId) return;

  const localProgress = getLocalLessonsProgress();
  if (!localProgress) return;

  const localCompleted = localProgress.filter((l) => l.completed).map((l) => l.id);
  if (!localCompleted.length) return;

  const profile = await getUserProfile(userId);
  const cloudCompleted = normalizeCompletedLessons(profile?.completedLessons);

  // Merge cloud + local once, preserving any cloud progress already present.
  const merged = [...new Set([...cloudCompleted, ...localCompleted])];
  await createOrMergeUserProfile(userId, {
    completedLessons: merged,
    totalLessons: merged.length,
    lastLessonId: merged[merged.length - 1] || LESSON_ORDER[0],
  });
};

export const completeLessonForUser = async (userId, lessonId) => {
  const fallbackProgress = getLocalLessonsProgress() || buildLessonState([]);
  const updatedFallback = fallbackProgress.map((lesson, index, allLessons) => {
    if (lesson.id === lessonId) return { ...lesson, completed: true };
    const previous = allLessons[index - 1];
    if (previous?.id === lessonId) return { ...lesson, locked: false };
    return lesson;
  });

  saveLocalLessonsProgress(updatedFallback);

  if (userId) {
    await updateLessonProgress(userId, lessonId, true);
  }

  return updatedFallback;
};

