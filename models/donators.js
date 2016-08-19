'use strict';
module.exports = function(sequelize, DataTypes) {
  var Donators = sequelize.define('Donators', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    username: DataTypes.STRING,
    zipcode: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Donators;
};