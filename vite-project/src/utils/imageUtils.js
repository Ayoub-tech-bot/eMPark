// Helper function to get correct image URL in all environments
export const getImageUrl = (imagePath) => {
  // If it's already a full URL, return as is
  if (imagePath.startsWith('http')) {
    return imagePath;
  }
  
  // In development, Vite serves from root
  if (import.meta.env.DEV) {
    return imagePath;
  }
  
  // In production (Vercel), ensure the path starts with /
  return imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
};

// Default fallback image
export const DEFAULT_GARAGE_IMAGE = '/images/garages/default-garage.jpg';