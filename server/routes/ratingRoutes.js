import express from "express";
import {
  getAllRatings,
  getRatingsForRestaurant,
  handleAddNewRating,
  updateRating,
} from "../controllers/ratingControllers.js";

const ratingRoutes = express.Router();

ratingRoutes.get("/healthcheck", (req, res) => {
  res.sendStatus(200);
});

ratingRoutes.post("/addnew", handleAddNewRating);

ratingRoutes.get("/getall", getAllRatings);

ratingRoutes.get("/getforrestaurant/:restaurantId", getRatingsForRestaurant);

ratingRoutes.put("/update/:ratingId", updateRating);

export default ratingRoutes;
