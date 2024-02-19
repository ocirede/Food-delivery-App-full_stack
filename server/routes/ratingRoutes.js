import express from "express";
import {
  getAllRatings,
  handleAddNewRating,
  updateRating,
} from "../controllers/ratingControllers.js";

const ratingRoutes = express.Router();

ratingRoutes.get("/healthcheck", (req, res) => {
  res.sendStatus(200);
});

ratingRoutes.post("/addnew", handleAddNewRating);

ratingRoutes.get("/getall", getAllRatings);

ratingRoutes.put("/update/:ratingId", updateRating);

export default ratingRoutes;
