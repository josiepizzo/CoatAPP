'use strict';
module.exports = function(sequelize, DataTypes) {
  var user = sequelize.define('user', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    name: DataTypes.STRING,
    zipcode: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
          user.hasMany(models.item, {
              foreignKey: {
              name: 'donatorId',
              allowNull: false
            }
          });
          user.hasMany(models.item, {
              foreignKey: {
              name: 'customerId',
              allowNull: true
            }
          });
      }
    }
  });
  return user;
};