import express from "express";
import {
  getCountry,
  getCountryById,
  getCountryByContinent,
  getCountryByName,
  deleteCountry,
  createCountry,
  updateCountry,
} from "../controller/countryController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(getCountry).post(protect, admin, createCountry);
router
  .route("/:id")
  .get(getCountryById)
  .delete(protect, admin, deleteCountry)
  .put(protect, admin, updateCountry);
router.route("/continent/:continent").get(getCountryByContinent);
router.route("/name/:name").get(getCountryByName);

export default router;
