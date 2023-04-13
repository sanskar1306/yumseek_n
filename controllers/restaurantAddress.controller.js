const Address = require("../models/address.model");
const Restaurant = require("../models/restaurant.model.js");
const RestaurantProfile = require("../models/restaurantProfile.model.js")
const RestaurantAddress = require("../models/restaurantAddress.model.js")
const createAddress = async (req, res) => {
  try {
    const { decoded } = res;
    let resProfile = await RestaurantProfile.findOne({restaurant : decoded._id});
    if (!resProfile) return res.status(404).json("Restaurant not found");
    else {
      let newAddress = await new RestaurantAddress({
        profile: resProfile._id,
        address1: req.body.address1,
        address2: req.body.address2,
        state: req.body.state,
        pinCode: req.body.pinCode,
        area: req.body.area,
        isDefault: req.body.isDefault,
      }).save();
      if (newAddress) return res.status(200).json(newAddress);
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};

const getAllAddresses = async (req, res) => {
  try {
    const { decoded } = res;
    const restaurant = await Restaurant.findById(decoded._id);

     if (!restaurant)
       return res
         .status(400)
         .json((errors.restaurant = "Restaurant not found"));
     const profile = await RestaurantProfile.findOne({
       restaurant: restaurant._id,
     });
    if (!profile) return res.status(404).json((errors.profile = "This User has no profile"));
    const addresses = await RestaurantAddress.find({ profile: profile._id });
    return res.status(200).json(addresses);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const getAddressById = async (req, res) => {
  try {
    const { id } = req.params;
    const address = await RestaurantAddress.findById(id).populate("profile", [
        "logo" ,
        "restaurant",
        "vegClass",
        "reviews",
        "openTime",
        "closeTime",
        "cuisines",
        "deliverytime",
        "phone",
        "rating",
    ]);
    if (!address) {
      return res.status(404).json({
        message: "Address not found",
      });
    }
    return res.status(200).json(address);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const updateAddress = async (req, res) => {
  try {
    const { id } = req.params;
    const address = await RestaurantAddress.findById(id);
    const { address1, address2, state, area, isDefault, pinCode } = req.body;
    const addressFields = {
      address1,
      address2,
      state,
      area,
      isDefault,
      pinCode,
    };
    let updatedAddress = await RestaurantAddress.updateOne(
      { _id: id },
      { $set: addressFields }
    );
    return res.status(200).json({ message: "Updated successfully" });
  } catch (error) {
    return res.status(500).json(error);
  }
};

const deleteAddress = async (req, res) => {
  try {
    const { id } = req.params;
    let address = await RestaurantAddress.deleteOne({ _id: id });
    if (address) {
      return res.status(200).json({});
    }
    return res.status(404).json({ message: "Address not found" });
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports = {
  createAddress,
  getAllAddresses,
  getAddressById,
  updateAddress,
  deleteAddress,
};
