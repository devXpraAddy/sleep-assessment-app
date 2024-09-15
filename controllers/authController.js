const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const config = require("../config");
const Event = require("../models/eventModel");

// Render signup page
exports.getSignupPage = (req, res) => {
  res.render("signup");
};

// Handle user registration
exports.signup = async (req, res) => {
  try {
    const { nickname, password } = req.body;

    const existingUser = await User.findOne({ nickname });
    if (existingUser) {
      return res.render("signup", { error: "Nickname already taken." });
    }

    const user = new User({ nickname, password });
    await user.save();

    // Log signup event
    const event = new Event({
      userId: user._id,
      eventType: "signup",
      metadata: {
        nickname: user.nickname,
      },
    });
    await event.save();

    res.redirect("/login");
  } catch (error) {
    res.render("signup", { error: "Error registering user." });
  }
};

// Render login page
exports.getLoginPage = (req, res) => {
  res.render("login");
};

// Handle user login
exports.login = async (req, res) => {
  try {
    const { nickname, password } = req.body;

    const user = await User.findOne({ nickname });
    if (!user) return res.render("login", { error: "Invalid credentials." });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.render("login", { error: "Invalid credentials." });

    user.lastLoginAt = new Date();
    await user.save();

    const token = jwt.sign({ id: user._id }, config.jwtSecret, {
      expiresIn: "1h",
    });

    // Log login event
    const event = new Event({
      userId: user._id,
      eventType: "login",
      metadata: {
        nickname: user.nickname,
      },
    });
    await event.save();

    res.cookie("token", token, { httpOnly: true });
    res.redirect("/dashboard");
  } catch (error) {
    res.render("login", { error: "Error logging in." });
  }
};

// Handle user logout
exports.logout = (req, res) => {
  res.clearCookie("token");
  res.redirect("/login");
};
