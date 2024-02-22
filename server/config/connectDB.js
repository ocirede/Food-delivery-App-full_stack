import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const dbName = process.env.DB_NAME;
    const uri = process.env.DB_URI;
    await mongoose.connect(uri, { dbName });
    console.log("Connected to database...");
  } catch (error) {
    console.error("Error connecting to MongoDB", error.message);
  }
};

export default connectDB;