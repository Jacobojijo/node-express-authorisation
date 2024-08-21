const jwt = require("jsonwebtoken");
require("dotenv").config(); // Load environment variables from .env

const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.TOKEN_KEY, { expiresIn: "1h" });
};

module.exports = generateToken;
