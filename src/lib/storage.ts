import { S3Client, PutObjectCommand, DeleteObjectCommand, HeadObjectCommand } from '@aws-sdk/client-s3';

// Initialize S3 client for Cubbit
export const cubbitClient = new S3Client({
  region: 'eu-west-1', // Cubbit uses EU region
  endpoint: process.env.CUBBIT_ENDPOINT,
  credentials: {
    accessKeyId: process.env.CUBBIT_ACCESS_KEY!,
    secretAccessKey: process.env.CUBBIT_SECRET_KEY!,
  },
  forcePathStyle: true, // Required for S3-compatible services
});

export const CUBBIT_BUCKET = process.env.CUBBIT_BUCKET!;

// Utility functions for image handling
export const isImageUrl = (url: string): boolean => {
  return Boolean(url && (url.startsWith('http') || url.startsWith('https')));
};

export const isBase64Image = (data: string): boolean => {
  return Boolean(data && data.startsWith('data:image/'));
};

export const getImageUrl = (imageData: string | null): string | null => {
  if (!imageData) return null;
  
  if (isImageUrl(imageData)) {
    return imageData; // Already a URL
  }
  
  if (isBase64Image(imageData)) {
    return imageData; // Base64 data URL
  }
  
  return null;
};

// Generate unique filename for avatar
export const generateAvatarFileName = (userId: string, originalName: string): string => {
  const fileExtension = originalName.split('.').pop() || 'jpg';
  return `avatars/${userId}-${Date.now()}.${fileExtension}`;
};

// Check if file exists in Cubbit
export const checkFileExists = async (key: string): Promise<boolean> => {
  try {
    await cubbitClient.send(new HeadObjectCommand({
      Bucket: CUBBIT_BUCKET,
      Key: key,
    }));
    return true;
  } catch (error) {
    return false;
  }
};

// Extract key from Cubbit URL
export const extractKeyFromUrl = (url: string): string | null => {
  if (!url || !url.includes('avatars/')) return null;
  
  try {
    const urlParts = url.split('/');
    const keyIndex = urlParts.findIndex(part => part === 'avatars');
    if (keyIndex !== -1 && keyIndex + 1 < urlParts.length) {
      return `${urlParts[keyIndex]}/${urlParts[keyIndex + 1]}`;
    }
  } catch (error) {
    console.error('Error extracting key from URL:', error);
  }
  
  return null;
}; 