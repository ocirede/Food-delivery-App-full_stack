import mongoose from "mongoose";

const cardSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    
    card: {
        number: String,
        expiry: String,
        cvv: Number,
        cardholder: String,
      },
  },
  {
    timestamps: true,
  }
);

const Card = mongoose.model("Card", cardSchema);

export default Card;