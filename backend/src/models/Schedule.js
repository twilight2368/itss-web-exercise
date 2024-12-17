const mongoose = require("mongoose");

const ScheduleSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
    time_start: {
      type: Date,
      default: Date.now,
    },
    time_end: { type: Date, default: Date.now },
    duration_in_minutes: {
      type: Number,
      min: 5,
      max: 90,
    },
    value: {
      type: String,
      enum: [
        "badminton",
        "basketball",
        "climbing",
        "dancing",
        "jumprope",
        "running",
        "soccer",
        "swimming",
        "yoga",
      ],
    },
  },
  { timestamps: true }
);

const scheduleModel = mongoose.model("schedule", ScheduleSchema);

module.exports = scheduleModel;
