import Rating from "../models/ratingSchema.js";
import Restaurant from "../models/restaurantSchema.js";
import User from "../models/userSchema.js";

//Add new rating and update the restaurant rating
export const handleAddNewRating = async (req, res) => {
  try {
    const { userId, restaurantId, ratingNumber, comment } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).send({
        success: false,
        error: "User not found.",
      });
    }

    const restaurant = await Restaurant.findById(restaurantId);

    if (!restaurant) {
      return res.status(404).send({
        success: false,
        error: "Restaurant not found.",
      });
    }

    const newRating = new Rating({
      user: userId,
      restaurant: restaurantId,
      ratingNumber,
      comment,
    });

    await newRating.populate("user");
    await newRating.populate("restaurant");

    await newRating.save();

    // Calculate the updated average rating for the restaurant
    const ratings = await Rating.find({ restaurant: restaurantId });
    const totalRating = ratings.reduce(
      (acc, curr) => acc + curr.ratingNumber,
      0
    );
    const averageRating = totalRating / ratings.length;

    // Update the averageRating field in the restaurant document
    await Restaurant.findByIdAndUpdate(
      restaurantId,
      { averageRating },
      { new: true }
    );

    res.send({ success: true, newRating });
    console.log("New rating created successfully:", newRating);
  } catch (error) {
    console.error("Error creating the rating");
    res.status(500).send({ success: false, error: error.message });
  }
};

//get all ratings
export const getAllRatings = async (req, res) => {
  try {
    const ratings = await Rating.find().populate("user").populate("restaurant");
    res.send({ success: true, ratings });
  } catch (error) {
    console.log("Error getting all ratings:", error.message);
    res.status(500).send({ success: false, error: error.message });
  }
};

//Update a rating
export const updateRating = async (req, res) => {
  const { ratingId } = req.params;

  try {
    const updatedRating = await Rating.findByIdAndUpdate(
      ratingId,
      { $set: req.body },
      { new: true }
    );

    await updatedRating.populate("user");
    await updatedRating.populate("restaurant");

    if (!updatedRating) {
      return res.send({ success: false, message: "Rating not found" });
    }

    console.log("Rating updated successfully:", updatedRating);
    res.send({
      success: true,
      rating: updatedRating,
      message: "Rating updated successfully",
    });
  } catch (error) {
    console.error("Error updating the rating", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};

//get ratings for the restaurant
export const getRatingsForRestaurant = async (req, res) => {
  const { restaurantId } = req.params;
  try {
    const ratings = await Rating.find({ restaurant: restaurantId })
      .populate("user")
      .populate("restaurant");
    if (!ratings) {
      return res.send({
        success: false,
        message: "Ratings not found for this restaurant",
      });
    }
    res.send({ success: true, ratings });
  } catch (error) {
    console.error(
      "Error finding the ratings for the restaurant",
      error.message
    );
    res.status(500).send({ success: false, error: error.message });
  }
};
