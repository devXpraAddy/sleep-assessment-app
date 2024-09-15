require("dotenv").config();

module.exports = {
  jwtSecret: process.env.JWT_SECRET,
  mongoURI: process.env.MONGO_URI,
  port: process.env.PORT || 3000,
};
