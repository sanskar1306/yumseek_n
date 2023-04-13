const express = require("express");
const router = express.Router();
const {
  getAddressById,
  getAllAddresses,
  createAddress,
  deleteAddress,
  updateAddress,
} = require("../controllers/restaurantAddress.controller.js");
const auth = require("../middlewares/auth");

router.get("/",auth.verifyToken, getAllAddresses);
router.get("/:id", auth.verifyToken, getAddressById);
router.post("/add", auth.verifyToken, createAddress);
router.put("/update/:id", auth.verifyToken, updateAddress);
router.delete("/delete/:id", auth.verifyToken, deleteAddress);

module.exports = router;
