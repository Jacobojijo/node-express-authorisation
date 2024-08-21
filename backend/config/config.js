const { Sequelize } = require("sequelize");
require("dotenv").config(); // Load environment variables from .env

const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./database.sqlite", // Path to your SQLite database file
});

module.exports = sequelize;
