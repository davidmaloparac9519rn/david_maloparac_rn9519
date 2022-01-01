'use strict';
var Sequelize = require('sequelize')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
   var Ride = sequelize.define("Ride", {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    number_of_passengers: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    train_id: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    start_id: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    end_id: {
      type: Sequelize.INTEGER,
      allowNull: true
    }
  });

  return Ride;
};