import Show from '../../../models/showModel.js';
import {getCurrentISTDateTime} from '../../../../utils/dateTimeUtils.js'


// Fetch all active movies with active shows that haven't expired
export const getActiveMoviesWithActiveShows = async () => {
    try {

        const { currentDate, currentTime } = getCurrentISTDateTime();

        // Find all active shows where the date and time are still valid
        const activeShows = await Show.find({
            status: 'active',
            $or: [
                // Shows with a future date
                { date: { $gt: currentDate } },
                // Shows with today's date but time is in the future
                {
                    date: currentDate,
                    time: { $gte: currentTime } // Ensure time is not expired for today
                }
            ]
        })
        .select('movieId')
        .populate({
            path: 'movieId',
            select: 'title poster genres'
        });

        console.log(activeShows)

        const uniqueMovies = activeShows.reduce((acc, show) => {
            // Check if the movie is already present in the accumulator
            const isMoviePresent = acc.find(movie => movie._id.toString() === show.movieId._id.toString());
    
            // If the movie is not present, add it to the accumulator
            if (!isMoviePresent) {
                acc.push(show.movieId);
            }
    
            return acc;
        }, []); // Initialize the accumulator as an empty array

        console.log('Unique Movies : ', uniqueMovies)
    
        return uniqueMovies;

    } catch (error) {
        console.error('Error fetching active movies with active shows:', error);
        throw new Error('Error fetching movies');
    }
};
