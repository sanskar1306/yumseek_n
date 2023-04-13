const express = require("express");
const router = express.Router();
const multer = require("multer");
const auth = require("../middlewares/auth");
const path = require("path");
const {
  getAllRestaurantProfile,
  getRestaurantProfileById,
  createRestaurantProfile,
  updateRestaurantProfile,
} = require("../controllers/restaurantProfile.controller.js");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      new Date().getTime().toString() +
        "-" +
        file.fieldname +
        path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });
router.get("/", getAllRestaurantProfile);
router.get(
  "/fetch/:id",
  auth.verifyToken,
  getRestaurantProfileById
);
router.post("/createProfile",auth.verifyToken, upload.single("logo"), createRestaurantProfile);


module.exports = router;
