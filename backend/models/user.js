const mongoose = require("mongoose");
const moment = require("moment");

const User = new mongoose.Schema({
  userName: {
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
    enum: ["citizen", "policeMen"],
    default: "citizen",
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("User", User);
