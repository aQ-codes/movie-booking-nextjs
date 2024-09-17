import express from "express";
import { validateCinemas } from "../module/cinemas/validators/cinemasValidator.js";
import { addCinemasController } from "../module/cinemas/controllers/addCinemasController.js";
import { getAllCinemasController } from "../module/cinemas/controllers/getAllCinemasController.js";
import { getCinemasByIdController } from "../module/cinemas/controllers/getCinemasByIdController.js";
import { getCinemasForMovieAndDate} from "../module/cinemas/controllers/getCinemasController.js"

const router = express.Router();

// add a new cinemas
router.post('/add', validateCinemas,addCinemasController);

//edit a cinemas
// router.put('/cinemas/:id/edit', editcinemas);

//delete a cinemas
// router.delete('/cinemas/:id/delete', deletecinemas);

//get a particular cinemas detail
router.get('/cinemas/:id', getCinemasByIdController);

//get all cinemass
router.get('/all', getAllCinemasController);

router.get('/:movieId/:date', getCinemasForMovieAndDate);

export default router;
