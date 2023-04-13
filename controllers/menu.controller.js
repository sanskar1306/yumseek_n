
const Menu = require("../models/menu.model.js");
const Restaurant = require("../models/restaurant.model.js");
const RestaurantProfile = require("../models/restaurantProfile.model.js");

const getAllMenu = async (req, res, next) => {
  try {
    const menus = await Menu.find();
    return res.status(200).json(menus);
  } catch (error) {
    res.status(500).json({ message: "Error getting all menus" });
  }
};

const getMenuById = async (req, res, next) => {
  try {
    const { decoded } = res;
    
    const menu = await Menu.findById(req.params.id).populate("restaurant",["name","restaurantName","email"]);
    return res.status(200).json(menu);
  } catch (error) {
    res.status(500).json({ message: "Error getting menu" });
  }
};

const createMenu = async (req, res, next) => {
    try {
        const { decoded } = res;
        const Profile = RestaurantProfile.findOne({ restaurant: decoded._id });
        if (!Profile) {
            return res.status(404).json({ message: "Profile not found" });
      }
      const isExist = await Menu.findOne({ restaurant: decoded._id });
      if (isExist) {
        return res.status(400).json({ message: "Menu already exist" });
      }
      const newMenu = await new Menu({
        restaurant: decoded._id,
        category: req.body.category,
        dishes: req.body.dishes,
        
      }).save();
      return res.status(201).json(newMenu);
        
  } catch (error) {
    return res.status(500).json( error );
  }
};

const updateMenu = async (req, res, next) => { 
 try {
     const { decoded } = res;
     const Profile = RestaurantProfile.findOne({ restaurant: decoded._id });
     if (!Profile) {
       return res.status(404).json({ message: "Profile not found" });
   }
   const updatedMenu = await Menu.findOneAndUpdate(
       { _id: req.params.id},
          { $set: req.body },
     { new: true }
   )
    res.status(200).json(updatedMenu);
 } catch (error) {
    res.status(500).json({ message: "Error updating menu" });
 }

};
const deleteMenu = async (req, res, next) => { 
  try {
     const { decoded } = res;
     const Profile = RestaurantProfile.findOne({ restaurant: decoded._id });
     if (!Profile) {
       return res.status(404).json({ message: "Profile not found" });
     }
    const menu = await Menu.findByIdAndDelete(req.params.id);
    return res.status(200).json(menu);
  } catch (error) {
    res.status(500).json({ message: "Error deleting menu" });
  }
};
module.exports = { getAllMenu, getMenuById,createMenu ,updateMenu,deleteMenu};
