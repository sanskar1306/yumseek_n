const Order = require("../models/order.model.js");
const Address = require("../models/address.model");
const User = require("../models/users.model.js");
const Restaurant = require("../models/restaurant.model.js");
const RestaurantProfile = require("../models/restaurantProfile.model.js");
const Menu = require("../models/menu.model.js");

const placeOrder = async (req, res) => {
   console.log(req.body.item[1].extras);
    try {
      const { decoded } = res;
      const user = await User.findById(decoded._id);

       const restaurantProfile = await RestaurantProfile.findOne({
         restaurant: `${req.body.restaurant}`,
       });
       if (!restaurantProfile && !user) {
         return res.status(404).json({ message: "User not found" });
       }
       const deliveryAddress = await Address.findById(req.body.deliveryaddress);
      let newTotal = 0;
      await req.body.item.forEach((y) => {
        newTotal += (y.price + (y.extras === undefined ? 0 : y.extras.itemPrice)) * y.quantity;
        
      });
      const placedOrder = await new Order({
        user: user._id,
        restaurant: restaurantProfile.restaurant,
        total: newTotal.toString(),
        item: req.body.item,
        deliveryaddress: deliveryAddress._id,
        paymenttype: req.body.paymenttype,
        paymentstatus: req.body.paymentstatus,
        status: "pending",
      }).save()
       return res.status(200).json(placedOrder);
    } catch (error) {
      res.status(500).json(error)
    }
};

const getAllOrders = async (req, res) => {
  try {
    const { decoded } = res;
    console.log(decoded);
    const user = await User.findById(decoded._id);
    const restaurantProfile = await RestaurantProfile.findOne({
      restaurant: decoded._id,
    });
    if (!restaurantProfile && !user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user) {
      const userOrders = await Order.find({ user: user._id });
      return res.status(200).json(userOrders);
    }
    if (restaurantProfile) {
      const restaurantOrders = await Order.find({ restaurant: decoded._id });
      return res.status(200).json(restaurantOrders);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const getOrderById = async (req, res) => {
  try {
    const user = await User.findById(decoded._id);
    const restaurantProfile = await RestaurantProfile.findOne({
      restaurant: decoded._id,
    });
    if (!restaurantProfile && !user) {
      return res.status(404).json({ message: "User not found" });
    }
    const OrderWithId = await Order.findById({ _id: req.params.id })
      .populate("user")
      .populate("restaurant");
    return res.status(200).json(OrderWithId);
  } catch (error) {}
};

const acceptOrder = async (req, res) => {
  try {
    const { decoded } = res;
    const restaurantProfile = RestaurantProfile.findOne({
      restaurant: decoded._id,
    });
    if (!restaurantProfile) {
      return res.status(404).json({ message: "User not found" });
    }
const prevOrder = await Order.findById(req.params.id);
if (!prevOrder) {
  return res.status(404).json({ message: "Order not found" });
}

const updatedOrder = await Order.findOneAndUpdate(
  { _id: req.params.id },
  {
    $set: {
      user: prevOrder.user,
      restaurant: prevOrder.restaurant,
      total: prevOrder.total,
      item: prevOrder.item,
      deliveryaddress: prevOrder.deliveryaddress,
      paymenttype: prevOrder.paymenttype,
      paymentstatus: prevOrder.paymentstatus,
      status: req.body.status,
    },
  },
  { new: true }
);
return res.status(200).json(updatedOrder);

  } catch (error) {
    res.status(500).json(error);
  }
};



const cancelOrder = async (req, res) => {
  try {
    const { decoded } = res;
    const user = User.findById(decoded._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const prevOrder = await Order.findById(req.params.id);
    if (!prevOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    const updatedOrder = await Order.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          user: prevOrder.user,
          restaurant: prevOrder.restaurant,
          total: prevOrder.total,
          item: prevOrder.item,
          deliveryaddress: prevOrder.deliveryaddress,
          paymenttype: prevOrder.paymenttype,
          paymentstatus: prevOrder.paymentstatus,
          status: "cancelled",
        },
      },
      { new: true }
    );
    return res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  placeOrder,
  cancelOrder,
  getAllOrders,
  getOrderById,
  acceptOrder,
};
