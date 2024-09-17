import express from "express";
import { validateScreen } from "../module/screen/validators/screenValidator.js";
import { addScreenController } from "../module/screen/controllers/addScreenController.js";
import { getScreensByCinemasIdController } from "../module/screen/controllers/getScreensByCinemasController.js";

const router = express.Router();

// add a new screen
router.post('/add', validateScreen,addScreenController);

//edit a cinemas
// router.put('/cinemas/:id/edit', editcinemas);

//delete a cinemas
// router.delete('/cinemas/:id/delete', deletecinemas);

//get a particular cinemas detail
// router.get('/cinemas/:id', getCinemasByIdController);

//get all screens of a particular cineams
router.get('/all/:cinemasId/', getScreensByCinemasIdController);

export default router;
