

const getShowsByCinemaAndDate = async (req, res) => {
    const { cinemaId, movieId, date } = req.params;

    try {
        const shows = await ShowRepository.getShowsByCinema(movieId, cinemaId, date);
        res.status(200).json(shows);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch shows', error });
    }
};