import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected To Mongo DB...!".underline.bold.blue);
  } catch (error) {
    console.log("Not Connected...!", error.message);
  }
};

export default connectDB;
