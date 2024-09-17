import express from "express";
import { addShowController } from "../module/show/controllers/addShowController.js";
import { validateShow } from "../module/show/validators/showValidator.js";
import { getActiveMovieDates } from "../module/show/controllers/getActiveDatesFormovieController.js";
// import { getActiveShowsForMovieController } from "../module/show/controllers/getActiveShowsForMovieController.js";


const router = express.Router();

// Add a new show
router.post('/add', validateShow,addShowController);
// Edit a show
// router.put('/:id', addShow); // Route to add a new show 

//get a particular show detail
// router.get('/:id', showDetail); // Route to get details of a specific show
// router.get('/:id/nested', showDetailNested); // Route to get details of a specific show with nested data
//get multiple shows based on their status
// router.get('/all', listShows); // Route to list all shows 
// router.get('/active', activeShows); // Route to list all active shows 
// router.get('/disabled', disabledShows); // Route to list all disabled shows
// router.get('/completed', completedShows); // Route to list all completed shows

// Route to gell all the active shows with all the details for a particular movie 
// router.get('/active/:movieId', getActiveShowsForMovieController);

//Route to get all the show dates that are active for a particular movie.
router.get('/active/:movieId/dates', getActiveMovieDates);

//Route to get all 

export default router;
