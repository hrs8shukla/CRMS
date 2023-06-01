const mongoose = require("mongoose");
const User = new mongoose.Schema({
  aadharNo: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  userType: {
    type: String,
    enum: ["citizen", "policeMen", "headOfficer"],
  },
  password: {
    type: String,
    required: true,
  },
  state: {
    type: String,
  },
  address: {
    type: String,
  },
  pincode: {
    type: String,
  },
  district: {
    type: String,
  },
});

module.exports = mongoose.model("User", User);