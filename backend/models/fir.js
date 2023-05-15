const mongoose = require("mongoose");

const Fir = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
    },
    beatNo: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "reject", "hold"],
      default: "pending",
    },
    complaintUser: {
      address: {
        type: String,
        required: true,
      },
      dob: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      aadharNo: {
        type: String,
        required: true,
      },
      nationality: {
        type: String,
      },
      occupation: {
        type: String,
      },
    },
    crimeDetails: {
      crime: {
        type: String,
      },
      suspected: {
        type: String,
      },
      district: {
        type: String,
      },
      date: {
        type: String,
      },
      time: {
        type: String,
      },
      day: {
        type: String,
      },
      state: {
        type: String,
      },
      address: {
        type: String,
      },
      colony: {
        type: String,
      },
      pinCode: {
        type: String,
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Fir", Fir);
