const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Users = sequelize.define('Users', {
 user_id: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey:true,
    autoIncrement:true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: true,
  },
 address: {
    type: DataTypes.STRING,
    allowNull: true,
  },
 dob: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  gender: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  created_at: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  updated_at: {
    type: DataTypes.STRING,
    allowNull: true,
  },
},{timestamps:false,freezeTableName:true});

module.exports = Users;