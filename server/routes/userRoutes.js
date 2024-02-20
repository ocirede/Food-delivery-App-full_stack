import express from "express";
import { body } from "express-validator";
import auth from "../middleware/user-auth.js";

import { profileImageUpload } from "../middleware/mutlerLocalstorage.js";
import {
  addToFavorites,
  deleteUser,
  handleRegister,
  handleSignIn,
  loggedUser,
  updateUser,
} from "../controllers/userControllers.js";

const userRoutes = express.Router();

userRoutes.get("/healthcheck", (req, res) => {
  res.sendStatus(200);
});

userRoutes.post(
  "/register",
  [
    //  Sanitization middleware
    body("username").trim().escape(),
    body("email").trim().escape(),
  ],
  handleRegister
);
userRoutes.post("/signin", handleSignIn);
userRoutes.get("/loggeduser", auth, loggedUser);

userRoutes.put(
  "/update/:userId",
  //should match the name attribute of the input field in your form where the file is being uploaded
  profileImageUpload.single("profileImage"),
  updateUser
);

userRoutes.put("/favourite/:restaurantId", addToFavorites);
userRoutes.delete("/delete/:userId", auth, deleteUser);

export default userRoutes;
