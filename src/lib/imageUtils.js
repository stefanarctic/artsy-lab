import { storage } from './firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

// Compress image before upload
const compressImage = async (file) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 1200;
        const MAX_HEIGHT = 1200;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(resolve, 'image/jpeg', 0.7); // Compress with 70% quality
      };
    };
  });
};

// Upload image to Firebase Storage
export const uploadImage = async (file, path) => {
  try {
    // Compress image
    const compressedFile = await compressImage(file);
    
    // Create unique filename
    const filename = `${Date.now()}-${Math.random().toString(36).substring(2)}`;
    const fullPath = `${path}/${filename}.jpg`;
    
    // Upload to Firebase Storage
    const storageRef = ref(storage, fullPath);
    await uploadBytes(storageRef, compressedFile);
    
    // Get download URL
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};