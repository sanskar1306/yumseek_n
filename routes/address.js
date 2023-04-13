const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const {getAllAddresses,createAddress,deleteAddress,updateAddress,getAddressById } = require('../controllers/address.controller.js');

router.get("/", auth.verifyToken, getAllAddresses);
router.get("/:id", auth.verifyToken, getAddressById);
router.post("/add", auth.verifyToken, createAddress);
router.put("/update/:id", auth.verifyToken, updateAddress);
router.delete("/delete/:id", auth.verifyToken, deleteAddress);

module.exports = router;
