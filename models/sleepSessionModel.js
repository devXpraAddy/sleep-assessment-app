const mongoose = require("mongoose");

const SleepSessionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  startedAt: { type: Date, default: Date.now },
  completedAt: { type: Date },
  status: {
    type: String,
    enum: ["in-progress", "completed"],
    default: "in-progress",
  },
  // Analytics field
  duration: { type: Number }, // in milliseconds
});

//Indexes to optimize query performance
SleepSessionSchema.index({ userId: 1, startedAt: -1 });
SleepSessionSchema.index({ status: 1 });

module.exports = mongoose.model("SleepSession", SleepSessionSchema);
