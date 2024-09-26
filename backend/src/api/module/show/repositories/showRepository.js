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

// Fetch all details of a specific show by showId
export const getShowDetails = async (showId) => {
  try {
      // Find the show by ID and populate related fields
      const showDetails = await Show.findById(showId)
          .populate({
              path: 'movieId', // Populate movie details
              select: 'title genres runningTime cast synopsis poster status'
          })
          .populate({
              path: 'screenId', // Populate screen details
              select: 'screenNumber screenType sections seatArrangement',
              populate: {
                  path: 'cinemas', // Populate cinema details inside screen
                  select: 'name location'
              }
          })
          .populate({
              path: 'prices.sectionId', // Populate section details
              select: 'sectionName sectionNumber '
          });
      
      return showDetails;
  } catch (error) {
      console.error('Error fetching show details:', error);
      throw new Error('Error fetching show details');
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

// Get all active shows for a cinema, movie, and date
export const getShowsForCinemas = async (movieId, date, cinemasId) => {
  // Fetch all active shows for the given movie, cinema, and date, and populate the screen details
  console.log(date,"entered repository")
  const shows = await Show.find({
    movieId,
    date,
    status: 'active',
  })
    .populate({
      path: 'screenId',
      match: { cinemas: cinemasId }, // Only fetch shows for screens in this cinema
      select: '_id screenNumber screenType', // Select only the relevant screen details
    })
    .select('_id time screenId'); // Select only show ID, time, and screenId

    console.log(shows)

  // Map the results to include only necessary information
  return shows.map(show => ({
    showId: show._id,
    time: show.time,
    screenId: show.screenId._id,
    screenNumber: show.screenId.screenNumber,
    screenType: show.screenId.screenType,
  }));
};



export const getShowPricesWithSections = async (showId) => {
  try {
    // Find the show by ID
    const showDetails = await Show.findById(showId)
      .populate({
        path: 'screenId', // Populate screen details
        select: 'sections', // Select only sections from screen details
      })
      .lean(); // Use lean to get plain JavaScript objects instead of Mongoose Documents

    if (!showDetails) {
      throw new Error('Show not found');
    }

    // Map over show prices and merge section details
    const pricesWithSections = showDetails.prices.map((priceObj) => {
      const sectionDetails = showDetails.screenId.sections.find(
        (section) => section._id.toString() === priceObj.sectionId.toString()
      );

      if (sectionDetails) {
        return {
          price: priceObj.price,
          sectionId: priceObj.sectionId,
          sectionName: sectionDetails.sectionName,
          sectionNumber: sectionDetails.sectionNumber,
        };
      } else {
        // If section not found for some reason
        return {
          price: priceObj.price,
          sectionId: priceObj.sectionId,
          sectionName: 'Unknown',
          sectionNumber: 'Unknown',
        };
      }
    });

    return pricesWithSections;
  } catch (error) {
    console.error('Error fetching show prices with sections:', error);
    throw new Error('Error fetching show prices with sections');
  }
};
