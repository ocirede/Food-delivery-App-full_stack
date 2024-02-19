import express from "express";
import {
  getAllRestaurants,
  handleAddManyRestaurants,
  handleNewReastaurant,
} from "../controllers/restaurantControllers.js";

const restaurantRoutes = express.Router();

restaurantRoutes.get("/healthcheck", (req, res) => {
  res.sendStatus(200);
});

restaurantRoutes.post("/addnew", handleNewReastaurant);

restaurantRoutes.post("/addmany", handleAddManyRestaurants);

restaurantRoutes.get("/getall", getAllRestaurants);

export default restaurantRoutes;
