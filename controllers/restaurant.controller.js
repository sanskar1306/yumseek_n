const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("../middlewares/auth.js");
const Restaurant = require("../models/restaurant.model.js");
const Joi = require("@hapi/joi");

const registerSchema = Joi.object({
  restaurantName: Joi.string().min(3).required(),
  name: Joi.string().min(3).required(),
  email: Joi.string().min(6).required().email(),
  password: Joi.string().min(6).required(),
 
});

const loginSchema = Joi.object({
  email: Joi.string().min(6).required().email(),
  password: Joi.string().min(6).required(),
});

const register = async (req, res) => {
  const checkEmail = await Restaurant.findOne({ email: req.body.email });

  if (checkEmail) {
    res.status(400).send("Email already exists");
    return;
  }

  const salt = await bcrypt.genSalt(10);

  const passwordHash = await bcrypt.hash(req.body.password, salt);
  const user = new Restaurant({
    restaurantName: req.body.restaurantName,
    name: req.body.name,
    email: req.body.email,
    password: passwordHash,
    
  });
  try {
    const { error } = await registerSchema.validateAsync(req.body);
    if (error) {
      res.status(400).send(error.details[0].message);
    } else {
      const saveUser = await user.save();
      res.status(200).send("User created");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const login = async (req, res) => {
  const user = await Restaurant.findOne({ email: req.body.email });
  if (!user) {
    res.status(400).send("User not found");
    return;
  }
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) {
    res.status(400).send("Incorrect password");
    return;
  }
  try {
    const { error } = await loginSchema.validateAsync(req.body);
    if (error) {
      res.status(400).send(error.details[0].message);
    } else {
      let token = await auth.generateAccessToken(user);
    
      return res.status(200).json({ jwtoken: `Bearer ${token}` });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.status(200).json(restaurants);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getRestaurantUser = async (req, res,next) => {
  try {
    const { decoded } = res;
    const user = await Restaurant.findById(decoded._id);
    if(!user){
      res.status(404).send("User not found");
    }
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
    
  }

}


const deleteRestaurantUser = async (req, res, next) => {
  try {
     const { decoded } = res;
    const restaurant = await Restaurant.findByIdAndDelete(decoded._id);
    
    return res.status(200).json({ success: true, restaurant: {} });
  } catch (error) {
    console.log(error);
     next(error);
  }
}

const updateRestaurantUser = async (req, res, next) => {
  try {
    const { decoded } = res;
    const restaurant = await Restaurant.findByIdAndUpdate(decoded._id, {
      $set: req.body
    });
    return res.status(200).json({ success: true, restaurant: restaurant });
  } catch (error) {
    console.log(error);
     next(error);
  }
}

module.exports = { getAllRestaurants ,login,
  register,getRestaurantUser,deleteRestaurantUser,updateRestaurantUser};
