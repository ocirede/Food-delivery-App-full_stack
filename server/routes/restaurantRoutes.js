import express from "express";

const restaurantRoutes = express.Router();

restaurantRoutes.get("/healthcheck", (req, res) => {
  res.sendStatus(200);
});

export default restaurantRoutes;
