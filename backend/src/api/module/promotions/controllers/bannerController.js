import { createBanner } from '../repositories/bannerRepository.js';

// Add Banner Controller
export const addBanner = async (req, res) => {
  try {
    console.log("entered addBanner");

    // Prepare the banner data from request
    const bannerData = {
      imageUrl: req.body.imageUrl,
      title: req.body.title,
      status: req.body.status,
    };

    // Save the banner using repository
    const savedBanner = await createBanner(bannerData);

    return res.status(201).json({
      message: 'Banner added successfully',
      banner: savedBanner,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error adding banner',
      error: error.message,
    });
  }
};


import { getAllBanners } from '../repositories/bannerRepository.js';

// Controller to get all banners
export const fetchAllBanners = async (req, res) => {
  try {
    const banners = await getAllBanners();
    return res.status(200).json({
      message: 'Banners fetched successfully',
      banners,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error fetching banners',
      error: error.message,
    });
  }
};
