import { db } from "@/lib/firebase.js";
import {
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  increment,
  limit,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  startAfter,
  updateDoc,
  where,
} from "firebase/firestore";
import {
  COLLECTIONS,
  LESSON_ORDER,
  getDefaultUserProfile,
  normalizeCompletedLessons,
} from "@/lib/appDataModel.js";

const usersCollection = collection(db, COLLECTIONS.users);
const artworksCollection = collection(db, COLLECTIONS.artworks);
const postsCollection = collection(db, COLLECTIONS.posts);

export const createUserProfile = async (userId, userData) => {
  const userRef = doc(db, COLLECTIONS.users, userId);
  const payload = {
    ...getDefaultUserProfile(userData),
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };
  await setDoc(userRef, payload, { merge: true });
  return true;
};

export const createOrMergeUserProfile = async (userId, userData = {}) => {
  const userRef = doc(db, COLLECTIONS.users, userId);
  await setDoc(
    userRef,
    {
      ...getDefaultUserProfile(userData),
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );
  return true;
};

export const getUserProfile = async (userId) => {
  const userRef = doc(db, COLLECTIONS.users, userId);
  const userSnap = await getDoc(userRef);
  if (!userSnap.exists()) return null;
  return { id: userSnap.id, ...userSnap.data() };
};

export const updateUserProfile = async (userId, updateData) => {
  const userRef = doc(db, COLLECTIONS.users, userId);
  const userDoc = await getDoc(userRef);
  if (!userDoc.exists()) {
    await createUserProfile(userId, updateData);
    return true;
  }

  await updateDoc(userRef, {
    ...updateData,
    updatedAt: serverTimestamp(),
  });
  return true;
};

export const updateLessonProgress = async (userId, lessonId, completed) => {
  const userRef = doc(db, COLLECTIONS.users, userId);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    const completedLessons = completed ? [lessonId] : [];
    await createUserProfile(userId, {
      completedLessons,
      totalLessons: completedLessons.length,
      lastLessonId: completedLessons[0] || LESSON_ORDER[0],
    });
    return true;
  }

  const userData = userSnap.data();
  const completedLessons = normalizeCompletedLessons(userData.completedLessons);
  let nextCompleted = completedLessons;

  if (completed && !completedLessons.includes(lessonId)) {
    nextCompleted = [...completedLessons, lessonId];
  } else if (!completed && completedLessons.includes(lessonId)) {
    nextCompleted = completedLessons.filter((id) => id !== lessonId);
  }

  await updateDoc(userRef, {
    completedLessons: nextCompleted,
    totalLessons: nextCompleted.length,
    lastLessonId: lessonId,
    progressUpdatedAt: new Date().toISOString(),
    updatedAt: serverTimestamp(),
  });
  return true;
};

export const saveArtwork = async (userId, artworkData) => {
  const artworkDoc = await addDoc(artworksCollection, {
    ...artworkData,
    userId,
    likesCount: 0,
    commentsCount: 0,
    isPublic: artworkData.isPublic ?? true,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  await updateDoc(doc(db, COLLECTIONS.users, userId), {
    totalArtworks: increment(1),
    updatedAt: serverTimestamp(),
  });

  return artworkDoc.id;
};

export const getUserArtworks = async (userId) => {
  const q = query(
    artworksCollection,
    where("userId", "==", userId),
    orderBy("createdAt", "desc")
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((entry) => ({ id: entry.id, ...entry.data() }));
};

export const getPublicArtworks = async ({ pageSize = 12, lastDoc = null } = {}) => {
  let artworksQuery = query(
    artworksCollection,
    where("isPublic", "==", true),
    orderBy("createdAt", "desc"),
    limit(pageSize)
  );

  if (lastDoc) {
    artworksQuery = query(artworksQuery, startAfter(lastDoc));
  }

  const snapshot = await getDocs(artworksQuery);
  const docs = snapshot.docs.map((entry) => ({ id: entry.id, ...entry.data() }));
  return {
    items: docs,
    lastDoc: snapshot.docs[snapshot.docs.length - 1] || null,
    hasMore: snapshot.docs.length === pageSize,
  };
};

export const createPost = async (userId, postData) => {
  const postRef = await addDoc(postsCollection, {
    ...postData,
    userId,
    likesCount: 0,
    commentsCount: 0,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return postRef.id;
};

export const getPostsFeed = async ({ pageSize = 10, lastDoc = null } = {}) => {
  let postsQuery = query(postsCollection, orderBy("createdAt", "desc"), limit(pageSize));
  if (lastDoc) {
    postsQuery = query(postsQuery, startAfter(lastDoc));
  }

  const snapshot = await getDocs(postsQuery);
  const items = snapshot.docs.map((entry) => ({ id: entry.id, ...entry.data() }));
  return {
    items,
    lastDoc: snapshot.docs[snapshot.docs.length - 1] || null,
    hasMore: snapshot.docs.length === pageSize,
  };
};

export const toggleLikeOnDocument = async ({ collectionName, docId, userId, liked }) => {
  const targetRef = doc(db, collectionName, docId);
  await updateDoc(targetRef, {
    likedBy: liked ? arrayUnion(userId) : arrayRemove(userId),
    likesCount: increment(liked ? 1 : -1),
    updatedAt: serverTimestamp(),
  });
};

export const addCommentToPost = async (postId, userId, content) => {
  const commentRef = collection(db, COLLECTIONS.posts, postId, COLLECTIONS.comments);
  await addDoc(commentRef, {
    userId,
    content,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  await updateDoc(doc(db, COLLECTIONS.posts, postId), {
    commentsCount: increment(1),
    updatedAt: serverTimestamp(),
  });
};

export const getPostComments = async (postId) => {
  const commentsRef = collection(db, COLLECTIONS.posts, postId, COLLECTIONS.comments);
  const commentsQuery = query(commentsRef, orderBy("createdAt", "asc"));
  const snapshot = await getDocs(commentsQuery);
  return snapshot.docs.map((entry) => ({ id: entry.id, ...entry.data() }));
};

export { usersCollection, artworksCollection, postsCollection };

