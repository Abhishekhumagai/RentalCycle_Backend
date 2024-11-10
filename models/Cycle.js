const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const RentalStation = require('/RentalStation');

const Cycle = sequelize.define('Cycle', {
  model: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'available',
  },
});

Cycle.belongsTo(RentalStation, { foreignKey: 'rentalStationId' });

module.exports = Cycle;
