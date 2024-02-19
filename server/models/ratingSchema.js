import mongoose from "mongoose";

const ratingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
  },
  ratingNumber: { type: Number, required: true },
  comment: { type: String },
});

const Rating = mongoose.model("Rating", ratingSchema);

export default Rating;
