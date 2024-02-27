import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./config/connectDB.js";
import fs from "fs";
import userRoutes from "./routes/userRoutes.js";
import restaurantRoutes from "./routes/restaurantRoutes.js";
import ratingRoutes from "./routes/ratingRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import cardRoutes from "./routes/cardRoutes.js";

const ProfImageUploads = "./uploads/profileImage";
if (!fs.existsSync(ProfImageUploads)) {
  fs.mkdirSync(ProfImageUploads);
}

const app = express();

const port = process.env.PORT;

app.use(express.json());

const corsOptions = {
  origin: "https://berlinvery-food-delivery-app.vercel.app/",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};
app.use(cors(corsOptions));

connectDB();

app.use("/uploads", express.static("uploads"));
app.use("/users", userRoutes);
app.use("/restaurants", restaurantRoutes);
app.use("/ratings", ratingRoutes);
app.use("/orders", orderRoutes);
app.use("/cards", cardRoutes);

app.listen(port, () => {
  console.log(`The server is running in port ${port}`);
});
