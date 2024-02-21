import express from "express";
import {
  findRestaurant,
  getAllRestaurants,
  handleAddManyRestaurants,
  handleAddNewReastaurant,
  updateRestaurant,
} from "../controllers/restaurantControllers.js";

const restaurantRoutes = express.Router();

restaurantRoutes.get("/healthcheck", (req, res) => {
  res.sendStatus(200);
});

restaurantRoutes.post("/addnew", handleAddNewReastaurant);

restaurantRoutes.post("/addmany", handleAddManyRestaurants);

restaurantRoutes.get("/getall", getAllRestaurants);

restaurantRoutes.put("/update/:restaurantId", updateRestaurant);

restaurantRoutes.get("/find/:restaurantId", findRestaurant);

export default restaurantRoutes;
