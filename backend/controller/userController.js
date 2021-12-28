import asyncHandler from "express-async-handler";
import connectDB from "../connection/connectDB.js";

import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

const authUser = asyncHandler(async (request, response) => {
  const { email, password } = request.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    response.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    response.status(401);
    throw new Error("Invalid email or password");
  }
});

const signup = asyncHandler(async (request, response) => {
  const { name, email, password } = request.body;
  const userExists = await User.findOne({ email });

  if (userExists) {
    response.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({ email, name, password });

  if (user) {
    response.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    response.status(400);
    throw new Error("Invalid user data");
  }
});

const getUserProfile = asyncHandler(async (request, response) => {
  const user = await User.findById(request.user.id);

  if (user) {
    response.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    response.status(404);
    throw new Error("User Not Found");
  }
});

const updateUserProfile = asyncHandler(async (request, response) => {
  const user = await User.findById(request.user.id);

  if (user) {
    user.name = request.body.name || user.name;
    user.email = request.body.email || user.email;

    if (request.body.password) {
      user.password = request.body.password;
    }

    const updatedUser = await user.save();
    response.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    });
  } else {
    response.status(404);
    throw new Error("User Not Found");
  }
});

const deleteUser = asyncHandler(async (request, response) => {
  connectDB();
  const user = await User.findById(request.params.id);
  if (user) {
    await user.remove();
    response.json({ message: "User Removed" });
  } else {
    response.status(404);
    throw newError("User not Found");
  }
});

const getUsers = asyncHandler(async (request, response) => {
  try {
    connectDB();
    const users = await User.find({}).sort({ name: 1 });
    response.json(users);
  } catch (error) {
    response.json(error.message);
    process.exit(1);
  }
});

export {
  authUser,
  signup,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
};
