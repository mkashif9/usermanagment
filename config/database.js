const { Sequelize } = require("sequelize");

const env = process.env.NODE_ENV || "development";
const config = require("./config");

const sequelize = new Sequelize(config[env]); // Pass environment-based configuration

module.exports = sequelize; // Export the instance
