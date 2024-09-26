import express from "express";
import { addShowController } from "../module/show/controllers/addShowController.js";
import { validateShow } from "../module/show/validators/showValidator.js";
import { getActiveMovieDates } from "../module/show/controllers/getActiveDatesFormovieController.js";
import { fetchShowPrices, getShowDetailsController, getShowsForCinemaAndDate } from "../module/show/controllers/getShowsController.js";


const router = express.Router();

// Add a new show
router.post('/add', validateShow,addShowController);

// get a particular show detail
router.get('/get/:showId', getShowDetailsController); 

//Route to get all the show dates that are active for a particular movie.
router.get('/active/:movieId/dates', getActiveMovieDates);

//Route to get all the active show times for a particular movie in a cinemas at a given date
router.get('/active/:movieId/:date/:cinemasId', getShowsForCinemaAndDate);

// get a particular show detail
router.get('/get/price/:showId', fetchShowPrices); 



export default router;
