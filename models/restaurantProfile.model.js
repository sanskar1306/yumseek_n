const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RestaurantProfileSchema = new Schema({
  restaurant: {
    type: Schema.Types.ObjectId,
    ref: "Restaurant",
  },

  vegClass: { type: String, enum: ["Veg", "Non-veg"], required: true },
  createdAt: { type: Date, default: Date.now },
  reviews: [
    {
      user: { type: Schema.Types.ObjectId, ref: "User" },
      rating: { type: Number, default: 0 },
      description: { type: String },
    },
  ],
  rating: { type: Number, default: 0 },
  openTime: { type: String, required: true },
  closeTime: { type: String, required: true },
  cuisines: [
    {
      type: String,
    },
  ],
  deliverytime: {
    type: String,
  },
  phone: {
    type: Number,
    required: true,
  },
  logo: {
    type: String,
  },
});

module.exports = mongoose.model("RestaurantProfile", RestaurantProfileSchema);
