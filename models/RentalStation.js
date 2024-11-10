const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const RentalStation = sequelize.define('RentalStation', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone_no: {
    type: DataTypes.STRING,
    allowNull: false,
  },
 Address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = RentalStation;