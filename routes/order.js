const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");

const {
  placeOrder, 
  cancelOrder,
  getAllOrders,
  getOrderById,
  acceptOrder,
} = require("../controllers/order.controller.js");

router.post("/placeOrder", auth.verifyToken, placeOrder);
router.put("/acceptOrder/:id", auth.verifyToken, acceptOrder);
router.put("/cancelOrder/:id", auth.verifyToken, cancelOrder);
router.get("/getOrderById/:id", auth.verifyToken, getOrderById);
router.get("/getAllOrders", auth.verifyToken, getAllOrders);

module.exports = router;


/*
{
    "restaurant": "61b200845c3169f2eb60aaca",
    "total": 550,
    "item": [
        {
            "name": "Paneer pakoda",
            "price": 79,
            "quantity": 2
        },
        {
            "name": "Chapati",
            "price": 10,
            "quantity": 8,
            "extras": {
                "itemName": "butter",
                "itemPrice": 2
            }
        },
        {
            "name": "Lassi",
            "price": 39,
            "quantity": 2
        }
    ],
    "paymenttype": "UPI",
    "paymentstatus": "complete",
    "deliveryaddress": "61b5b54637c3d41111090d86"
}

*/