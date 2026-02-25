import { db } from "./firebase";
import { collection, doc, getDoc, getDocs, limit, orderBy, query, startAfter, where } from "firebase/firestore";
import { getPublicArtworks, getUserProfile as getUserProfileRaw } from "@/lib/firestore.js";

// Cache for storing fetched data
const cache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Helper function to check if cache is valid
const isCacheValid = (timestamp) => {
  return Date.now() - timestamp < CACHE_DURATION;
};

// Get paginated artworks
export const getArtworks = async (pageSize = 10, lastDoc = null) => {
  const cacheKey = `artworks_${pageSize}_${lastDoc?.id || "start"}`;
  
  // Check cache first
  if (cache.has(cacheKey)) {
    const { data, timestamp } = cache.get(cacheKey);
    if (isCacheValid(timestamp)) {
      return data;
    }
    cache.delete(cacheKey);
  }

  try {
    const result = await getPublicArtworks({ pageSize, lastDoc });
    const artworks = result.items;

    // Store in cache
    cache.set(cacheKey, {
      data: artworks,
      timestamp: Date.now()
    });

    return artworks;
  } catch (error) {
    console.error('Error fetching artworks:', error);
    throw error;
  }
};

// Get user profile with minimal data
export const getUserProfile = async (userId) => {
  const cacheKey = `user_${userId}`;
  
  if (cache.has(cacheKey)) {
    const { data, timestamp } = cache.get(cacheKey);
    if (isCacheValid(timestamp)) {
      return data;
    }
    cache.delete(cacheKey);
  }

  try {
    const profile = await getUserProfileRaw(userId);
    
    if (profile) {
      const data = {
        id: profile.id,
        ...profile,
        // Only include essential fields
        artworksCount: profile.totalArtworks || 0,
        lessonsCompleted: profile.totalLessons || 0
      };

      cache.set(cacheKey, {
        data,
        timestamp: Date.now()
      });

      return data;
    }
    return null;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};

// Get lesson data with caching
export const getLesson = async (lessonId) => {
  const cacheKey = `lesson_${lessonId}`;
  
  if (cache.has(cacheKey)) {
    const { data, timestamp } = cache.get(cacheKey);
    if (isCacheValid(timestamp)) {
      return data;
    }
    cache.delete(cacheKey);
  }

  try {
    const docRef = doc(db, "lessons", lessonId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const data = {
        id: docSnap.id,
        ...docSnap.data()
      };

      cache.set(cacheKey, {
        data,
        timestamp: Date.now()
      });

      return data;
    }
    return null;
  } catch (error) {
    console.error('Error fetching lesson:', error);
    throw error;
  }
};

// Clear cache when needed (e.g., after updates)
export const clearCache = (key = null) => {
  if (key) {
    cache.delete(key);
  } else {
    cache.clear();
  }
};