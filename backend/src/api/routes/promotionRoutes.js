import express from "express";
import { addBanner, fetchAllBanners } from "../module/promotions/controllers/bannerController.js";
import { validateBanner } from "../module/promotions/validators/bannerValidator.js";

const router = express.Router();

//banner routes
router.post('/banner/add', validateBanner, addBanner); //add banner
router.get('/banners/all', fetchAllBanners); //add banner

export default router;
