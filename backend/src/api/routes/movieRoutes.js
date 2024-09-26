import express from "express";
// custom import 
import { addMovieController } from '../module/movie/controllers/addMovieController.js'; 
import { getAllMoviesController } from "../module/movie/controllers/gettAllMoviesController.js";
import { validateMovie } from "../module/movie/validators/movieValidator.js";
import { searchMoviesController } from "../module/movie/controllers/searchMoviesController.js";
import { getActiveMoviesController } from "../module/movie/controllers/getActiveMoviesController.js";
import { getMovieDetailsController } from "../module/movie/controllers/getMovieDetailsController.js";

const router = express.Router();

//add a movie
router.post('/add', validateMovie, addMovieController);

// get a particular movie detail
router.get('/details/:movieId', getMovieDetailsController);

// get multiple movies based on their status
router.get('/all', getAllMoviesController); // Route to list all movies

router.get('/search', searchMoviesController); // Route to  search for movies by name 

router.get('/active', getActiveMoviesController); // Route to list all active movies that have active shows



export default router;
