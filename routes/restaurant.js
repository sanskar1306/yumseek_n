const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth.js");
const { getAllRestaurants,login,register,getRestaurantUser,deleteRestaurantUser ,updateRestaurantUser} =require("../controllers/restaurant.controller.js");


router.get('/', getAllRestaurants);
router.post('/login', login);
router.post('/register', register);
router.get('/user', auth.verifyToken, getRestaurantUser);
router.delete('/user/deleteAccount', auth.verifyToken, deleteRestaurantUser);
router.post('/user/updateAccount', auth.verifyToken, updateRestaurantUser);

module.exports = router;