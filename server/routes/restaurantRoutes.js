import express from "express";
import {
  findRestaurant,
  getAllRestaurants,
  handleAddManyRestaurants,
  handleAddNewReastaurant,
} from "../controllers/restaurantControllers.js";

const restaurantRoutes = express.Router();

restaurantRoutes.get("/healthcheck", (req, res) => {
  res.sendStatus(200);
});

restaurantRoutes.post("/addnew", handleAddNewReastaurant);

restaurantRoutes.post("/addmany", handleAddManyRestaurants);

restaurantRoutes.get("/getall", getAllRestaurants);

restaurantRoutes.get("/find/:restaurantId", findRestaurant);

export default restaurantRoutes;
