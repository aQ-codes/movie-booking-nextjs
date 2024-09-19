import { getShowDetails, getShowsForCinemas } from "../repositories/showRepository.js";


export const getShowsForCinemaAndDate = async (req, res) => {
    console.log("entered getshowsfoecinmeas")
    const { movieId, date, cinemasId } = req.params;
    console.log(movieId,date,cinemasId)
    try {
      const shows = await getShowsForCinemas(movieId, cinemasId, date);
      res.status(200).json(shows);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch shows', error: error.message });
    }
  };


// Controller to fetch show details by showId
export const getShowDetailsController = async (req, res) => {
  const { showId } = req.params;

  try {
      const showDetails = await getShowDetails(showId);
      
      // Check if the show exists
      if (!showDetails) {
          return res.status(404).json({ message: 'Show not found' });
      }

      // Return the show details in the response
      res.status(200).json(showDetails);
  } catch (error) {
      console.error('Error in getShowDetailsController:', error);
      res.status(500).json({ message: 'Server error while fetching show details' });
  }
};