import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./config/connectDB.js";
import fs from "fs";
import userRoutes from "./routes/userRoutes.js";

const ProfImageUploads = "./uploads/profileImage";
if (!fs.existsSync(ProfImageUploads)) {
  fs.mkdirSync(ProfImageUploads);
}

const app = express();

const port = process.env.PORT;

app.use(express.json());

app.use(cors());

connectDB();

app.use("/uploads", express.static("uploads"));
app.use("/users", userRoutes);

app.listen(port, () => {
  console.log(`The server is running in port ${port}`);
});
