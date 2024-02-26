import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    info: { type: String },
    averageRating: { type: Number },
    address: {
      street: String,
      city: String,
      postalCode: String,
      country: String,
    },
    menu: [
      {
        name: String,
        description: String,
        price: Number,
      },
    ],
    category: { type: String, required: true },
    image: { type: String },
  },
  {
    timestamps: true,
  }
);

const Restaurant = mongoose.model("Restaurant", restaurantSchema);

export default Restaurant;
