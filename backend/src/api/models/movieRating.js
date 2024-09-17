// models/Rating.js
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

// Define the Rating schema
const RatingSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  movieId: {
    type: Schema.Types.ObjectId,
    ref: 'Movie',
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5 // a rating scale of 1-5
  },
});

// Create a model from the schema
const Rating = mongoose.model('Rating', RatingSchema);

export default Rating;

