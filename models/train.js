'use strict';
const {
  Model
} = require('sequelize');
const User = require('./user');
module.exports = (sequelize, DataTypes) => {
  var Train = sequelize.define("Train", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    number_of_seats: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });

  // Train.associate = (models) => {
  //   Train.hasMany(models.User);
  // };
  
  return Train;
};
