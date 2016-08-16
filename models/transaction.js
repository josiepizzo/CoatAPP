'use strict';
module.exports = function(sequelize, DataTypes) {
  var transaction = sequelize.define('transaction', {
    donator: DataTypes.STRING,
    itemid: DataTypes.STRING,
    customer: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return transaction;
};