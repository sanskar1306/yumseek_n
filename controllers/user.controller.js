const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/users.model.js");
const Joi = require("@hapi/joi");

const registerSchema = Joi.object({
  firstName: Joi.string().min(3).required(),
  lastName: Joi.string().min(3).required(),
  email: Joi.string().min(6).required().email(),
  password: Joi.string().min(6).required(),
  
});

const loginSchema = Joi.object({
  email: Joi.string().min(6).required().email(),
  password: Joi.string().min(6).required(),
});

const register = async (req, res) => {
  const checkEmail = await User.findOne({ email: req.body.email });

  if (checkEmail) {
    res.status(400).send("Email already exists");
    return;
  }

  const salt = await bcrypt.genSalt(10);

  const passwordHash = await bcrypt.hash(req.body.password, salt);
  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
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
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    res.status(404).send("User not found");
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
      const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
      res.header("auth-token", token).send(token);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { decoded } = res;
    const user = await User.findByIdAndDelete(decoded._id);

    return res.status(200).json({ success: true, user: {} });
  } catch (error) {
    res.status(500).send(error);
  }
}




module.exports = { register, login ,deleteUser};
