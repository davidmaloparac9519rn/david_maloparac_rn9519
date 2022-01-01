'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  var Station = sequelize.define("Station", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  });

  return Station;
};