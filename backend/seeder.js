import mongoose from "mongoose";
import dotenv from "dotenv";
import "colors";

import users from "./data/usersData.js";
import User from "./models/userModel.js";
import connectDB from "./connection/connectDB.js";

dotenv.config();
connectDB();

const importData = async () => {
  try {
    await User.deleteMany();
    const createdUsers = await User.insertMany(users);
    console.log("Data Imported...!".underline.bold.green);
    process.exit();
  } catch (error) {
    console.error(`Error :${error.message}`.red.bold.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await User.deleteMany();
    console.log("Data Destroyed!".red.inverse);
    process.exit();
  } catch (error) {
    console.error(`Error :${error.message}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
