import mongoose from 'mongoose';

// Shows are instances of a movie running at a particular time
const showSchema = new mongoose.Schema({
  movieId: { type: mongoose.Schema.Types.ObjectId, ref: "Movie", required: true },
  screenId: { type: mongoose.Schema.Types.ObjectId, ref: "Screen", required: true }, // Reference to Screen document
  date: { type: Date, required: true },
  time: { type: String, required: true },
  status: { type: String, enum: ["disabled", "completed", "active"], required: true },
  language: { type: String, required: true },  // Added language field
  prices: [
    {
      sectionId: { type: mongoose.Schema.Types.ObjectId, required: true }, // Reference to sections._id within the Screen document
      price: { type: Number, required: true }, // Price for the section
    },
  ],
});

const Show = mongoose.model("Show", showSchema);

export default Show;
