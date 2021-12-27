import asyncHandler from "express-async-handler";

import CountryModel from "../models/countryModel.js";
import ConnectDB from "../connection/connectDB.js";

const getCountry = asyncHandler(async (request, response) => {
  try {
    ConnectDB();
    const country = await CountryModel.find({}).sort({ name: 1 });
    response.json(country);
  } catch (error) {
    response.json(error.message);
    process.exit(1);
  }
});

const getCountryById = asyncHandler(async (request, response) => {
  ConnectDB();
  const country = await CountryModel.findById(request.params.id);
  if (country) {
    response.json(country);
  } else {
    response.status(404);
    throw new Error("Movies Not Found...!");
  }
});

const getCountryByContinent = asyncHandler(async (request, response) => {
  ConnectDB();
  const continents = await CountryModel.find({
    continent: request.params.continent,
  }).sort({ name: 1 });
  if (continents) {
    response.json(continents);
  } else {
    response.status(404);
    throw new Error("Movies Not Found...!");
  }
});

const getCountryByName = asyncHandler(async (request, response) => {
  ConnectDB();
  const name = await CountryModel.find({ name: request.params.name });
  if (name) {
    response.json(name);
  } else {
    response.status(404);
    throw new Error("Movie Not Found...!");
  }
});

const deleteCountry = asyncHandler(async (request, response) => {
  ConnectDB();
  const country = await CountryModel.findById(request.params.id);
  if (country) {
    await country.remove();
    response.json({ message: "Product removed" });
  } else {
    response.status(404);
    throw new Error("Country not found");
  }
});

const createCountry = asyncHandler(async (request, response) => {
  ConnectDB();
  const country = new CountryModel({
    name: "Sample name",
    continent: 0,
    user: request.user._id,
    image: "/images/sample.jpg",
    continent: "Sample continent",
    rating: 0,
    numReviews: 0,
    description: "Sample description",
  });

  const createdCountry = await country.save();
  response.status(201).json(createdCountry);
});

const updateCountry = asyncHandler(async (request, response) => {
  ConnectDB();
  const { name, continent, description, image, rating, numReviews } =
    request.body;

  const country = await CountryModel.findById(request.params.id);
  if (country) {
    country.name = name;
    country.continent = continent;
    country.description = description;
    country.image = image;
    country.rating = rating;
    country.numReviews = numReviews;

    const updatedCountry = await country.save();
    response.json(updatedCountry);
  } else {
    response.status(404);
    throw new Error("Country not found");
  }
});

export {
  getCountry,
  getCountryById,
  getCountryByContinent,
  getCountryByName,
  deleteCountry,
  updateCountry,
  createCountry,
};
