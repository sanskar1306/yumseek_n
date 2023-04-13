const Address = require("../models/address.model");
const User = require("../models/users.model.js");

const createAddress = async (req, res) => {
  try {
    const { decoded } = res;
    let user = await User.findById(decoded._id);
      if (!user) return res.status(404).json("User not found")
      else {
          let newAddress = await new Address({
              user: decoded._id,
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
    const user = await User.findById(decoded._id);
      if (!user) {
          return res.status(404).json({
              message: "User not found",
          });
      }
      else {
          let addresses = await Address.find({ user: decoded._id });
        
          return res.status(200).json(addresses);
      }
  } catch (error) {
    return res.status(500).json(error);
  }
};

const getAddressById = async (req, res) => {
  try {
    const { id } = req.params;
    const address = await Address.findById(id).populate("user",["firstName","lastName","email"]);
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
    const address = await Address.findById(id);
    const { address1, address2, state, area, isDefault, pinCode } = req.body;
    const addressFields = {
      address1,
      address2,
      state,
      area,
      isDefault,
      pinCode,
      };
       let updatedAddress = await Address.updateOne(
         { _id: id },
         { $set: addressFields }
       );
       return res.status(200).json({message: "Updated successfully"});
  } catch (error) {
      return res.status(500).json(error)
  }
};

const deleteAddress = async (req, res) => {
  try {
    const { id } = req.params;
    let address = await Address.deleteOne({ _id: id });
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
