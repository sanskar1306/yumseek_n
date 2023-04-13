const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RestaurantAddressSchema = new Schema({
  profile: {
    type: Schema.Types.ObjectId,
    ref: "RestaurantProfile",
  },
  address1: {
    type: String,
    required: true,
  },
  address2: {
    type: String,
  },
  state: {
    type: String,
    required: true,
  },
  area: {
    type: String,
    required: true,
  },
  pinCode: {
    type: Number,
    required: true,
  },
  isDefault: {
    type: Boolean,
    default: false,
  },
  creationdate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("RestaurantAddress", RestaurantAddressSchema);


/*
{
  "address1":"Plot no 28",
  "address2":"Vishwakarma Mandir Road",
  "area":"Ramchandra Nagar",
  "state":"Maharashtra",
  "pinCode":425001,
  "isDefault":true
}


*/