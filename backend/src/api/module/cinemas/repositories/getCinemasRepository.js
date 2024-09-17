import Cinemas from "../../../models/cinemasModel.js";
import Show from "../../../models/showModel.js";
import Screen from "../../../models/screenModel.js";

// Get all cinemas that have shows for the specified movieId and date
export const getCinemasWithShowsForMovieAndDate = async (movieId, date) => {
  const screensWithShows = await Show.find({ movieId, date }).distinct('screenId');

  // Get cinemas Ids from screens
  const cinemasWithScreens = await Screen.find({ _id: { $in: screensWithShows } }).distinct('cinemas');

  // Fetch full cinema details
  const cinemas = await Cinemas.find({ _id: { $in: cinemasWithScreens } });
  
  return cinemas;
};
