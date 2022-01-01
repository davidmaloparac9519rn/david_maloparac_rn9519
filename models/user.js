'use strict';
const {
  Model
} = require('sequelize');
// TREBA DA POGLEDAM KAKO DA U MIGRACIJI STAVIM DA 
// IMA JEDAN DEFAULT ADMIN KOJI JE VEC NAPRAVLJEN (ili je to u seeders folderu ???)

// TREBA DA EKPORTUJEM RUTER I ZA OSTALE STVARI, A NE SAMO ZA USERA
// (pogledaj users.js (na dnu))
const train = require('./train');
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define("User", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: "Email is not valid"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      default: "standard"
    }
    // train_id: {
    //   type: DataTypes.INTEGER,
    //   allowNull: true
    // }
  });

  // User.associate = (models) => {
  //     User.belongsTo(train, { foreignKey: 'user_id' });
  // };

  return User;
};
