import Show from '../../../models/showModel.js'; 
import { getCurrentISTDateTime } from '../../../../utils/dateTimeUtils.js';

// Add a new show
export const addShow = async (showData) => {
  try {
    const newShow = new Show(showData);
    return await newShow.save(); // Save the show to the database
  } catch (error) {
    console.error(error);
    throw new Error('Error adding show to the database');
  }
};

// Get all shows
export const getAllShows = async () => {
  try {
    return await Show.find()
      .populate('movie')  // Populate movie details
      .populate('screen') // Populate screen details
      .populate({
        path: 'screen',
        populate: {
          path: 'cinemas', // Populate cinemas details within screen
        },
      }); 
  } catch (error) {
    console.error(error);
    throw new Error('Error fetching shows from the database');
  }
};

// Get a show by ID
export const getShowById = async (id) => {
  try {
    return await Show.findById(id)
      .populate('movie')
      .populate('screen')
      .populate({
        path: 'screen',
        populate: {
          path: 'cinemas',
        },
      }); 
  } catch (error) {
    console.error(error);
    throw new Error('Error fetching show from the database');
  }
};

// Update a show by ID
export const updateShow = async (id, showData) => {
  try {
    return await Show.findByIdAndUpdate(id, showData, { new: true })
      .populate('movie')
      .populate('screen')
      .populate({
        path: 'screen',
        populate: {
          path: 'cinemas',
        },
      }); 
  } catch (error) {
    console.error(error);
    throw new Error('Error updating show in the database');
  }
};

// Delete a show by ID
export const deleteShow = async (id) => {
  try {
    return await Show.findByIdAndDelete(id);
  } catch (error) {
    console.error(error);
    throw new Error('Error deleting show from the database');
  }
};

// Fetch all active shows for a particular movie
export const getActiveShowsForMovie = async (movieId) => {
  try {
      const now = new Date();

      const activeShows = await Show.find({
          movieId: movieId,
          status: 'active',
          date: { $gte: now.toISOString().split('T')[0] }, // Ensure date is not expired
          time: { $gte: now.toTimeString().substring(0, 5) } // Ensure time is not expired for today
      })
      .populate({
          path: 'screenId',
          populate: [
              { path: 'cinemas' }, 
              { path: 'sections' },
          ],
      })

      return activeShows;
  } catch (error) {
      console.error('Error fetching active shows for movie:', error);
      throw new Error('Error fetching shows');
  }
};

//get active show dates that are not expired for a particular movie
export const getActiveDatesForMovie = async (movieId) => {
  try {
    // Get the current IST date
    const { currentDate } = getCurrentISTDateTime();

    // Find all active shows for the given movie where the date is today or in the future
    const shows = await Show.find({
      movieId,
      status: 'active',
      date: { $gte: currentDate }, // Get shows for today or future
    }).select('date') // Only select the date field
      .sort({ date: 1 }); // Sort the dates in ascending order

    // Extract unique dates from the shows
    const uniqueDates = [...new Set(shows.map(show => show.date.toISOString().split('T')[0]))];

    console.log(uniqueDates)

    return uniqueDates;
  } catch (error) {
    console.error('Error fetching active dates for movie:', error);
    throw new Error('Could not fetch active dates');
  }
};
