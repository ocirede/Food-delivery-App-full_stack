import express from "express";
import {
  getRatingsForRestaurant,
  handleAddNewRating,
} from "../controllers/ratingControllers.js";

const ratingRoutes = express.Router();

ratingRoutes.get("/healthcheck", (req, res) => {
  res.sendStatus(200);
});

ratingRoutes.post("/addnew", handleAddNewRating);

ratingRoutes.get("/getforrestaurant/:restaurantId", getRatingsForRestaurant);

export default ratingRoutes;
