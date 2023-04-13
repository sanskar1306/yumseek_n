const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("../middlewares/auth.js");
const Restaurant = require("../models/restaurant.model.js");
const RestaurantProfile = require("../models/restaurantProfile.model.js");
const Joi = require("@hapi/joi");

const getAllRestaurantProfile = async (req, res) => {
  try {
    const restaurants = await RestaurantProfile.find();
    res.status(200).json(restaurants);
  } catch (error) {
    res.status(500).json(error);
  }
};

const createRestaurantProfile = async (req, res) => {
  try {
    const { decoded } = res;
    console.log(req.body);
    const restaurant = await Restaurant.findById(decoded._id);
    
    if (!restaurant)
      return res.status(404).json({ errors: "No restaurant match" });
    else {
      const fields = {
        logo: req.file.path,
        restaurant: decoded._id,
        vegClass: req.body.vegClass,
        reviews: req.body.reviews?.map((item) => item.trim()),
        openTime: req.body.openTime,
        closeTime: req.body.closeTime,
        cuisines: req.body?.cuisines?.map((item) => item.trim()),
        deliverytime:req.body.deliverytime,
        phone:req.body.phone,
        rating:req.body.rating,
      };
      let restaurantProfile = await RestaurantProfile.findOne({
        restaurant: decoded._id,
      });
      if (restaurantProfile) {
        let updatedProfile = await RestaurantProfile.findOneAndUpdate(
          { restaurant: decoded._id },
          { $set: fields },
          { new: true }
        );
        res.status(200).json(updatedProfile);
      } else {
        console.log(fields);
        newProfile = await new RestaurantProfile(fields).save();
        return res.status(201).json(newProfile);
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};



const getRestaurantProfileById = async (req, res) => {
  try {
    const id = req.params.id;
    let profile = await RestaurantProfile.findOne({ restaurant: id })
      .populate("restaurant", ["name", "restaurantName", "email"]);
     if (!profile)
       return res
         .status(404)
         .json({ errors: "No associated profile for requested resource" });
     return res.status(200).json(profile);
  } catch (error) {
    res.status(500).json(error);  
  }
};

module.exports = {
  getAllRestaurantProfile,
  createRestaurantProfile,
  getRestaurantProfileById,
  
};
