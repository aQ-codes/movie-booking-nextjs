import mongoose from 'mongoose';

// Defines the movie details schema
const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  cast: { type: [String], required: true }, // Array of cast members
  synopsis: { type: String, required: true }, // Brief description of the movie
  runningTime: { type: Number, required: true }, // Running time in minutes
  poster: { type: String, required: true }, // URL or path to the movie poster image
  status: { 
    type: String, 
    enum: ["active", "upcoming", "completed"],
    required: true 
  }, // Status of the movie (active, upcoming, or completed)
  genres: { 
    type: [String], 
    required: true 
  } // Array of genres
});

const Movie = mongoose.model("Movie", movieSchema);

export default Movie;
