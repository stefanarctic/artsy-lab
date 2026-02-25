const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = 'artsy_uploads';

// Function to upload image to Cloudinary
export const uploadImage = async (file) => {
  if (!CLOUD_NAME) {
    throw new Error("Cloudinary cloud name missing. Set VITE_CLOUDINARY_CLOUD_NAME.");
  }

  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', UPLOAD_PRESET);
    formData.append('folder', 'artsy-lab'); // Matches your asset folder setting

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error(`Cloudinary upload failed (${response.status})`);
    }

    const data = await response.json();
    if (!data?.secure_url) {
      throw new Error("Cloudinary did not return secure_url.");
    }
    return data.secure_url;
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    throw error;
  }
};

// Function to optimize image URL
export const getOptimizedImageUrl = (url, width = 800, quality = 'auto') => {
  if (!url) return '';
  // Extract the base URL and add transformation parameters
  const baseUrl = url.split('upload/')[0] + 'upload/';
  const imagePath = url.split('upload/')[1];
  return `${baseUrl}w_${width},q_${quality}/${imagePath}`;
};