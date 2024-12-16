const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: String,
    password: String,
    date_of_birth: {
      type: Date,
      default: Date.now,
    },
    phone: String,
    place_of_work: String,
    position: String,
    target: {
      gain_weight: {
        description: {
          type: String,
          default: "",
        },
        crr_w: {
          type: Number,
          default: 0,
        },
        init_w: {
          type: Number,
          default: 0,
        },
        target_w: {
          type: Number,
          default: 0,
        },
        time_start: {
          type: Date,
          default: Date.now,
        },
        time_end: {
          type: Date,
          default: Date.now,
        },
        isActive: {
          type: Boolean,
          default: false,
        },
      },
      loss_weight: {
        description: {
          type: String,
          default: "",
        },
        crr_w: {
          type: Number,
          default: 0,
        },
        init_w: {
          type: Number,
          default: 0,
        },
        target_w: {
          type: Number,
          default: 0,
        },
        time_start: {
          type: Date,
          default: Date.now,
        },
        time_end: {
          type: Date,
          default: Date.now,
        },
        isActive: {
          type: Boolean,
          default: false,
        },
      },
      health_improve: {
        description: {
          type: String,
          default: "",
        },
        time_start: {
          type: Date,
          default: Date.now,
        },
        time_end: {
          type: Date,
          default: Date.now,
        },
        evaluate: {
          type: Number,
          min: 0,
          max: 5,
        },
        isActive: {
          type: Boolean,
          default: false,
        },
      },
    },
  },
  { timestamps: true }
);

const userModel = mongoose.model("user", UserSchema);

module.exports = userModel;
