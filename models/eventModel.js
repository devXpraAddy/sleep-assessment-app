const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  eventType: { type: String, required: true },
  metadata: { type: mongoose.Schema.Types.Mixed },
  createdAt: { type: Date, default: Date.now },
});

//Indexes to optimize query performance
EventSchema.index({ eventType: 1, createdAt: -1 });
EventSchema.index({ userId: 1, createdAt: -1 });

module.exports = mongoose.model("Event", EventSchema);
