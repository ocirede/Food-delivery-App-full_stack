import express from "express";
import {
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

export default restaurantRoutes;
