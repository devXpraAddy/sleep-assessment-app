const mongoose = require("mongoose");

const SleepAnswerSchema = new mongoose.Schema({
  sessionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SleepSession",
    required: true,
  },
  questionId: { type: String, required: true },
  answer: { type: mongoose.Schema.Types.Mixed, required: true },
  answeredAt: { type: Date, default: Date.now },
  // For analytics
  answerValue: { type: Number }, // Numeric representation for aggregation
});

// Indexes to optimize query performance
SleepAnswerSchema.index({ questionId: 1, answerValue: 1 });

module.exports = mongoose.model("SleepAnswer", SleepAnswerSchema);
