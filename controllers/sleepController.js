const SleepSession = require("../models/sleepSessionModel");
const SleepAnswer = require("../models/sleepAnswerModel");
const Event = require("../models/eventModel");

// Render dashboard
exports.getDashboard = (req, res) => {
  res.render("dashboard", { nickname: req.user.nickname });
};

// Start a new sleep assessment session
exports.startSession = async (req, res) => {
  try {
    const session = new SleepSession({
      userId: req.user.id,
    });

    await session.save();

    // Log start_session event
    const event = new Event({
      userId: req.user.id,
      eventType: "start_session",
      metadata: {
        sessionId: session._id,
      },
    });
    await event.save();

    res.redirect(`/sleep-assessment/${session._id}`);
  } catch (error) {
    res.status(500).send("Error starting session.");
  }
};

// Render sleep assessment screen
exports.getAssessmentScreen = (req, res) => {
  res.render("assessment", { sessionId: req.params.sessionId });
};

// Submit answers
exports.submitAnswers = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const answers = req.body.answers;

    // Save answers
    for (const key in answers) {
      const ans = answers[key];
      const sleepAnswer = new SleepAnswer({
        sessionId,
        questionId: ans.questionId,
        answer: ans.answer,
        // Optionally, map answer to numeric value for analytics
        answerValue: mapAnswerToValue(ans.questionId, ans.answer),
      });
      await sleepAnswer.save();
    }

    // Update session status and duration
    const session = await SleepSession.findById(sessionId);
    const completedAt = new Date();
    const duration = completedAt - session.startedAt; // in milliseconds

    session.status = "completed";
    session.completedAt = completedAt;
    session.duration = duration;
    await session.save();

    // Log submit_answers event
    const event = new Event({
      userId: req.user.id,
      eventType: "submit_answers",
      metadata: {
        sessionId: sessionId,
        duration: duration,
      },
    });
    await event.save();

    res.redirect(`/sleep-assessment/${sessionId}/results`);
  } catch (error) {
    res.status(500).send("Error submitting answers.");
  }
};

// Helper function to map answers to numeric values
function mapAnswerToValue(questionId, answer) {
  // Implement mapping logic based on questionId
  if (questionId === "q4") {
    return parseInt(answer, 10); // Number of hours of sleep
  }
  // Add more mappings as needed
  return null;
}

// Render results screen
exports.getResults = async (req, res) => {
  try {
    const { sessionId } = req.params;

    // Retrieve answers
    const answers = await SleepAnswer.find({ sessionId });

    // Placeholder for score calculation
    const score = calculateScore(answers);

    // Log view_results event
    const event = new Event({
      userId: req.user.id,
      eventType: "view_results",
      metadata: {
        sessionId: sessionId,
        score: score,
      },
    });
    await event.save();

    res.render("results", { score });
  } catch (error) {
    res.status(500).send("Error retrieving results.");
  }
};

// Placeholder function for score calculation
function calculateScore(answers) {
  // Implement actual scoring logic based on answers
  return 75; // Hardcoded for now
}
