import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

const protect = asyncHandler(async (request, response, next) => {
  let token;
  if (
    request.headers.authorization &&
    request.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // console.log("Header:", request.headers);
      token = request.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // console.log(decoded);
      request.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      console.log(error);
      response.status(401);
      throw new Error("Not authirized, token failed");
    }
  }
  if (!token) {
    response.status(401);
    throw new Error("Not authorized, no token");
  }
});

const admin = (request, response, next) => {
  if (request.user && request.user.isAdmin) {
    next();
  } else {
    response.status(401);
    throw new Error("Not authorized as an admin");
  }
};

export { protect, admin };
