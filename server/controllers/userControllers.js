import User from "../models/userSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import fs from "fs";

//Register user
export const handleRegister = async (req, res) => {
  try {
    const saltRounds = 10;

    const { username, email, password, confirmpassword } = req.body;

    if (password !== confirmpassword)
      return res.status(400).send({
        success: false,
        error: "Please check the passwords to be the same",
      });

    const hashedpassword = await bcrypt.hash(password, saltRounds);
    const newUser = new User({
      username,
      email,
      password: hashedpassword,
    });
    await newUser.save();

    res.send({ success: true, newUser });
    console.log("New user created successfully:", newUser);
  } catch (error) {
    console.error("Error creating the user");
    res.status(500).json({ success: false, error: error.message });
  }
};

//Sign in user
export const handleSignIn = async (req, res) => {
  try {
    const { password, email } = req.body;
    const user = await User.findOne({ email });

    const isMatched = await bcrypt.compare(password, user.password);

    if (!isMatched || !user)
      return res.status(400).send({
        success: false,
        error: "Email or password is wrong",
      });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECTER_KEY, {
      expiresIn: "1d",
    });
    res.send({ success: true, token, user });
  } catch (error) {
    console.log("Error sign in:", error.message);
    res.status(500).send({ success: false, error: error.message });
  }
};

//logged user
export const loggedUser = async (req, res) => {
  try {
    const userId = req.user.userId;
    // const userId = req.params.id;
    const user = await User.findOne({ _id: userId });
    res.send({ success: true, user });
  } catch (error) {
    console.log("Error logged user:", error.message);
    res.status(500).send({ success: false, error: error.message });
  }
};

//Delete profile
export const deleteUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const findUser = await User.findById(userId);
    if (findUser.image) {
      const filePath = "uploads/profileImage/" + findUser.image;
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error("Error deleting file:", err);
          return;
        }
        console.log("File deleted successfully");
      });
    }

    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).send({
        success: false,
        error: "User not found.",
      });
    }

    res.send({ message: "User deleted successfully!" });
  } catch (error) {
    console.log("Error deleting the user:", error.message);
    res.status(500).send({ success: false, error: error.message });
  }
};

//Update a user
export const updateUser = async (req, res) => {
  const { userId } = req.params;

  try {
    if (req.file) {
      const findUser = await User.findById(userId);
      if (findUser.image) {
        const filePath = "uploads/profileImage/" + findUser.image;
        fs.unlink(filePath, (err) => {
          if (err) {
            console.error("Error deleting file:", err);
            return;
          }
          console.log("File deleted successfully");
        });
      }
      req.body.image = req.file.filename;
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: req.body },
      { new: true }
    );

    if (!updatedUser) {
      return res.send({ success: false, message: "User not found" });
    }

    console.log("User updated successfully:", updatedUser);
    res.send({
      success: true,
      user: updatedUser,
      message: "Updated successfully",
    });
  } catch (error) {
    console.error("Error updating the user", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};

export const addToFavorites = async (req, res) => {
  const { userId } = req.user;
  const { RestaurantId } = req.params;
  const user = await User.findById(userId);

  if (!user) {
    return res.status(404).send({
      success: false,
      error: "User not found.",
    });
  }

  const Restaurant = await Restaurant.findById(RestaurantId);

  if (!Restaurant) {
    return res.status(404).send({
      success: false,
      error: "Restaurant not found.",
    });
  }

  const isFavourite = user.favourites.includes(RestaurantId);

  if (isFavourite) {
    user.favourites = user.favourites.filter(
      (id) => id.toString() !== RestaurantId
    );
  } else {
    user.favourites.push(RestaurantId);
  }

  await blog.save();
  await blog.populate("likes");

  res.json(blog);
};