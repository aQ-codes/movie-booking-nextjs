import { axiosInstance } from '@/config/axiosConfig'; 
import { Banner } from '@/app/(user)/models/models';

export const fetchBannerImages = async (): Promise<{ src: string; title: string }[]> => {
  try {
    const response = await axiosInstance.get('/promotions/banners/all');
    const banners = response.data.banners;

    // Map the banners to the expected format
    return banners.map((banner: Banner) => ({
      src: banner.imageUrl, // src for the image
      title: banner.title,  // title from the banner
    }));
  } catch (error) {
    console.error('Error fetching banners:', error);
    throw error;
  }
};
