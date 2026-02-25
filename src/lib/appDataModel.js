export const COLLECTIONS = {
  users: "users",
  artworks: "artworks",
  posts: "posts",
  comments: "comments",
  likes: "likes",
};

export const LESSON_ORDER = ["head-shape", "eyes", "nose", "mouth"];

export const getDefaultUserStats = () => ({
  totalArtworks: 0,
  totalLessons: 0,
  averageScore: 0,
  critiquesCount: 0,
});

export const getDefaultUserProgress = () => ({
  completedLessons: [],
  lastLessonId: LESSON_ORDER[0],
  progressUpdatedAt: new Date().toISOString(),
});

export const getDefaultUserProfile = (overrides = {}) => ({
  displayName: "",
  email: "",
  bio: "",
  photoURL: null,
  ...getDefaultUserStats(),
  ...getDefaultUserProgress(),
  ...overrides,
});

export const normalizeCompletedLessons = (value) => {
  if (!Array.isArray(value)) return [];
  const normalized = value.filter((lessonId) => LESSON_ORDER.includes(lessonId));
  return [...new Set(normalized)];
};

