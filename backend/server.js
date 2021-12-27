import express from "express";
import dotenv from "dotenv";
import "colors";
// import path from "path";

import connectDB from "./connection/connectDB.js";
import countryRouter from "./routes/countryRoutes.js";
import userRouter from "./routes/userRoutes.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

dotenv.config();

connectDB();
const app = express();
app.use(express.json());

app.get("/", (request, response) => {
  response.send("Api is running...");
});

app.use("/api/country", countryRouter);
app.use("/api/users", userRouter);

// const __dirname = path.resolve();
// app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 3001;

app.listen(
  PORT,
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`
      .underline.bold.green
  )
);
