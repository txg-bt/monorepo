const jwt = require("jsonwebtoken");
require("dotenv").config();

function jwtGenerator(user_id, email) {
  const payload = {
    user_id,
    email,
  };

  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" });
}

module.exports = { jwtGenerator };
