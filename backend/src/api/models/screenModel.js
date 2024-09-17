import mongoose from 'mongoose';

// Screen where a particular show runs
const screenSchema = new mongoose.Schema({
  screenNumber: { type: Number, required: true },
  screenType: { type: String, required: true },
  sections: [
    {
      sectionNumber: { type: Number, required: true }, 
      sectionName: { type: String, required: true }, // Section name/type (like Platinum, Gold, etc.)
    },
  ],
  seatArrangement: { type: String, required: true },
  cinemas: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cinemas",
    required: true,
  }, // Reference to Cinemas
});

const Screen = mongoose.model("Screen", screenSchema);

export default Screen;
