import express from "express";
import {
  handleAddNewCard,
  handleGetCard,
} from "../controllers/cardController.js";

const cardRoutes = express.Router();

cardRoutes.get("/healthcheck", (req, res) => {
  res.sendStatus(200);
});

cardRoutes.post("/addnew/:userId", handleAddNewCard);

cardRoutes.get("/getcard/:userId", handleGetCard);

export default cardRoutes;
