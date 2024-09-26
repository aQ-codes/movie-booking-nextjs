import Banner from '../../../models/bannerModel.js'

// Repository function to save banner data
export const createBanner = async (bannerData) => {
  try {
    console.log("entered banner repository")
    const banner = new Banner(bannerData);
    const savedBanner = await banner.save();
    return savedBanner;
  } catch (error) {
    throw new Error('Failed to save banner: ' + error.message);
  }
};



// Repository function to get all banners
export const getAllBanners = async () => {
    try {
      const banners = await Banner.find(); 
      return banners;
    } catch (error) {
      throw new Error(`Error fetching banners: ${error.message}`);
    }
  };
  