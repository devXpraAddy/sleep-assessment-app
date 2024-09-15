const express = require("express");
const router = express.Router();
const sleepController = require("../controllers/sleepController");
const { protect } = require("../middleware/authMiddleware");

// Dashboard
router.get("/dashboard", protect, sleepController.getDashboard);

// Start session
router.post("/sleep-assessment/start", protect, sleepController.startSession);

// Assessment screen
router.get(
  "/sleep-assessment/:sessionId",
  protect,
  sleepController.getAssessmentScreen
);

// Submit answers
router.post(
  "/sleep-assessment/:sessionId/answers",
  protect,
  sleepController.submitAnswers
);

// Results
router.get(
  "/sleep-assessment/:sessionId/results",
  protect,
  sleepController.getResults
);

module.exports = router;
