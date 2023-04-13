const express = require("express");
const router = express.Router();
const cors = require("cors");
router.use(cors());

const userRoute = require("./users.js");
const restaurantRoute = require("./restaurant.js");
const restaurantProfileRoute = require("./restaurantProfile.js");
const addressRoute = require("./address.js");
const restaurantAddressRoute = require("./restaurantAddress.js")
const menuRoute = require("./menu.js");
const orderRoute = require("./order.js")
router.use("/api/user", userRoute);
router.use("/api/restaurantUser", restaurantRoute);
router.use("/api/restaurantProfile", restaurantProfileRoute);
router.use("/api/user/address", addressRoute);
router.use("/api/restaurantProfile/address", restaurantAddressRoute);
router.use("/api/restaurantProfile/Menu", menuRoute);
router.use("/api/order", orderRoute);
router.get("/api", (req, res, next) => {
  res.status(200).json({ message: "Shit Happens 💩" });
});

module.exports = router;