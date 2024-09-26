import express from "express";
import { validateScreen } from "../module/screen/validators/screenValidator.js";
import { addScreenController } from "../module/screen/controllers/addScreenController.js";
import { getScreensByCinemasIdController } from "../module/screen/controllers/getScreensByCinemasController.js";
import { getScreenByIdController } from "../module/screen/controllers/getScreenController.js";
import { updateScreenController } from "../module/screen/controllers/putScreenController.js";


const router = express.Router();

// add a new screen
router.post('/add', validateScreen,addScreenController);

//edit a screen
router.put('/edit/:screenId',validateScreen, updateScreenController);

//get a particular screen detail
router.get('/:screenId', getScreenByIdController);

//get all screens of a particular cineams
router.get('/all/:cinemasId/', getScreensByCinemasIdController);

export default router;
