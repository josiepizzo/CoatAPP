'use strict';
module.exports = function(sequelize, DataTypes) {
  var user = sequelize.define('user', {
    uid: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
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