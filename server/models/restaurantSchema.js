import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
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
  },
  {
    timestamps: true,
  }
);

const Restaurant = mongoose.model("Restaurant", restaurantSchema);

export default Restaurant;
