import express from "express";
import {
  getOrdersForUser,
  handleAddNewOrder,
} from "../controllers/orderController.js";

const orderRoutes = express.Router();

orderRoutes.get("/healthcheck", (req, res) => {
  res.sendStatus(200);
});

orderRoutes.post("/addnew", handleAddNewOrder);

orderRoutes.get("/getforuser/:userId", getOrdersForUser);

export default orderRoutes;
