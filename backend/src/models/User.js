const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: String,
    password: {
      type: String,
      select: false,
    },
    email: {
      type: String,
      unique: true,
    },
    date_of_birth: {
      type: Date,
      default: Date.now,
    },
    phone: {
      type: String,
      default: "",
    },
    place_of_work: {
      type: String,
      default: "",
    },
    position: {
      type: String,
      default: "",
    },
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
          default: 0,
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
