import { db } from './firebase';
import { 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  collection, 
  query, 
  where, 
  getDocs 
} from 'firebase/firestore';

// User Profile Operations
export const createUserProfile = async (userId, userData) => {
  try {
    const userRef = doc(db, 'users', userId);
    await setDoc(userRef, {
      ...userData,
      createdAt: new Date(),
      totalArtworks: 0,
      totalLessons: 0,
      completedLessons: [],
      bio: '',
      photoURL: null,
      ...userData
    });
    return true;
  } catch (error) {
    console.error('Error creating user profile:', error);
    throw error;
  }
};

export const getUserProfile = async (userId) => {
  try {
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      return { id: userSnap.id, ...userSnap.data() };
    }
    return null;
  } catch (error) {
    console.error('Error getting user profile:', error);
    throw error;
  }
};

export const updateUserProfile = async (userId, updateData) => {
  try {
    console.log('Updating user profile for ID:', userId);
    console.log('Update data:', updateData);
    
    const userRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userRef);
    
    if (!userDoc.exists()) {
      console.log('User document does not exist, creating...');
      await setDoc(userRef, {
        ...updateData,
        createdAt: new Date(),
        totalArtworks: 0,
        totalLessons: 0,
        completedLessons: []
      });
    } else {
      console.log('User document exists, updating...');
      await updateDoc(userRef, updateData);
    }
    
    console.log('Update successful');
    return true;
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
};

// Lesson Progress Operations
export const updateLessonProgress = async (userId, lessonId, completed) => {
  try {
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);
    
    if (userSnap.exists()) {
      const userData = userSnap.data();
      const completedLessons = userData.completedLessons || [];
      
      if (completed && !completedLessons.includes(lessonId)) {
        completedLessons.push(lessonId);
      } else if (!completed) {
        const index = completedLessons.indexOf(lessonId);
        if (index > -1) {
          completedLessons.splice(index, 1);
        }
      }
      
      await updateDoc(userRef, {
        completedLessons,
        totalLessons: completedLessons.length
      });
    }
    return true;
  } catch (error) {
    console.error('Error updating lesson progress:', error);
    throw error;
  }
};

// Artwork Operations
export const saveArtwork = async (userId, artworkData) => {
  try {
    const artworksRef = collection(db, 'artworks');
    const artworkDoc = doc(artworksRef);
    
    await setDoc(artworkDoc, {
      ...artworkData,
      userId,
      createdAt: new Date(),
      likes: 0,
      comments: 0
    });

    // Update user's total artworks
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      await updateDoc(userRef, {
        totalArtworks: (userSnap.data().totalArtworks || 0) + 1
      });
    }

    return artworkDoc.id;
  } catch (error) {
    console.error('Error saving artwork:', error);
    throw error;
  }
};

export const getUserArtworks = async (userId) => {
  try {
    const artworksRef = collection(db, 'artworks');
    const q = query(artworksRef, where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting user artworks:', error);
    throw error;
  }
};