const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  restaurant: {
    type: Schema.Types.ObjectId,
    ref: "Restaurant",
    required: true,
  },
  item: [
    {
      name: String,
    
      price: Number,
      quantity: Number,
     
      extras: {
        itemName: String,
        itemPrice: Number,
      },
    },
  ],
  creation_date: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    default: "pending",
    enum: ["pending", "rejected", "preparing", "delivered","cancelled"],
  },
  total: {
    type: Number,
    required: true,
  },
  paymenttype: {
    type: String,
    required: true,
    enum: ["COD", "UPI", "WALLET", "CARD"],
  },
  paymentstatus: {
    type: String,
    default: "pending",
    enum: ["complete", "COD"],
  },

  deliveryaddress: {
    type: Schema.Types.ObjectId,
    ref: "Address",
  },
});

module.exports = mongoose.model("Order", OrderSchema);
