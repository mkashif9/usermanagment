const { Sequelize } = require("sequelize");

const env = process.env.NODE_ENV || "development";
const config = require("./config")[env];

const sequelize = new Sequelize(config); // Pass environment-based configuration

module.exports = sequelize; // Export the instance
