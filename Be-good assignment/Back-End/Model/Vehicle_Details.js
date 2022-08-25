const mongoose = require("mongoose");

const Vehicle_DetailsSchema = new mongoose.Schema(
  {
    Name: {
      type: String,
      default: null,
    },
    email: {
      type: String,
      required: [true, "Please provide email"],
    },
    password: {
        type: String,
    },
    accountType: {
      type: String,
      required: [true, "Please provide account type"],
      enum: ["customer", "admin"],
      default: "customer",
    },
    plateNo: {
        type: String,
    },
    chassisNo: {
        type: String,
    },
    Vehicle_Type: {
      type: String,
  },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Vehicle_Details", Vehicle_DetailsSchema);