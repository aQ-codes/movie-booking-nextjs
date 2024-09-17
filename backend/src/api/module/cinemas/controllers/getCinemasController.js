import {getCinemasWithShowsForMovieAndDate} from '../repositories/getCinemasRepository.js'


export const getCinemasForMovieAndDate = async (req, res) => {
    const { movieId, date } = req.params;
    try {
        const cinemasWithShows = await getCinemasWithShowsForMovieAndDate(movieId, date);
        res.status(200).json(cinemasWithShows);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch cinemas', error: error.message });
    }
    };