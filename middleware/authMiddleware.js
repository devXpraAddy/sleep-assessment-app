const jwt = require("jsonwebtoken");
const config = require("../config");
const User = require("../models/userModel");

exports.protect = async (req, res, next) => {
  const token =
    req.cookies.token || req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res.redirect("/login");
  }

  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    req.user = await User.findById(decoded.id).select("-password");
    next();
  } catch (error) {
    res.redirect("/login");
  }
};
