'use strict';
module.exports = function(sequelize, DataTypes) {
  var item = sequelize.define('item', {
    category: DataTypes.STRING,
    title: {
      type: DataTypes.STRING,
      allowNull: false
    }, 
    //customer: DataTypes.STRING,
    //transactionDate: DataTypes.DATE(),
    transactionDate: DataTypes.DATE,
    type: DataTypes.STRING,
    size: DataTypes.STRING,
    condition: DataTypes.STRING,
    image: DataTypes.STRING,
    zipcode: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return item;
};