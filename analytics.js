const mongoose = require("mongoose");
const config = require("./config");

// Import models
const Event = require("./models/eventModel");
const SleepSession = require("./models/sleepSessionModel");
const SleepAnswer = require("./models/sleepAnswerModel");

// Connect to MongoDB
mongoose
  .connect(config.mongoURI)
  .then(async () => {
    console.log("Connected to MongoDB");

    // Execute analytics functions
    await userEngagement();
    await averageSleepDuration();
    await answerDistribution();

    // Close the connection
    mongoose.disconnect();
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

// 1. User Engagement
async function userEngagement() {
  try {
    const activeUsersPerDay = await Event.aggregate([
      { $match: { eventType: "login" } },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
            day: { $dayOfMonth: "$createdAt" },
          },
          users: { $addToSet: "$userId" },
        },
      },
      {
        $project: {
          date: {
            $dateFromParts: {
              year: "$_id.year",
              month: "$_id.month",
              day: "$_id.day",
            },
          },
          activeUsers: { $size: "$users" },
        },
      },
      { $sort: { date: 1 } },
    ]);

    console.log("Active Users Per Day:");
    console.log(activeUsersPerDay);
  } catch (error) {
    console.error("Error retrieving active users per day:", error);
  }
}

// 2. Average Sleep Assessment Duration
async function averageSleepDuration() {
  try {
    const result = await SleepSession.aggregate([
      { $match: { status: "completed" } },
      {
        $group: {
          _id: null,
          averageDuration: { $avg: "$duration" },
        },
      },
    ]);

    const averageDuration = result[0]?.averageDuration || 0;
    console.log("Average Sleep Assessment Duration (ms):", averageDuration);
  } catch (error) {
    console.error("Error calculating average duration:", error);
  }
}

// 3. Distribution of Answers
async function answerDistribution() {
  try {
    const distribution = await SleepAnswer.aggregate([
      { $match: { questionId: "q4" } },
      {
        $group: {
          _id: "$answer",
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
    ]);

    console.log("Answer Distribution for Question q4:");
    console.log(distribution);
  } catch (error) {
    console.error("Error retrieving answer distribution:", error);
  }
}
