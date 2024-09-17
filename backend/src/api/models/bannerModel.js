import mongoose from "mongoose";

const bannerSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: true, // URL of the banner image
  },
  title: {
    type: String,
    required: true, // Title of the banner
  },
  status: {
    type: String,
    enum: ["active", "inactive"], // Status to show if the banner is active or not
    default: "active",
  }
});

const Banner = mongoose.model("Banner", bannerSchema);

export default Banner;
