// config/db.js

require('dotenv').config();  // Load environment variables
const { Sequelize } = require('sequelize');

// Set up Sequelize connection using environment variables
const sequelize = new Sequelize(process.env.MYSQL_DB, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {
  host: process.env.MYSQL_HOST,  // Ensure you are using the correct host
  dialect: 'mysql',  // Set dialect to 'mysql'
});

// Function to connect to MySQL database
const connectDB = async () => {
  try {
    await sequelize.authenticate();  // Test the connection
    console.log('MySQL connected...');
  } catch (error) {
    console.error('Unable to connect to MySQL:', error);
  }
};

module.exports = { sequelize, connectDB };  // Export the connection and function
