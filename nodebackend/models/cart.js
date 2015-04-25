'use strict';

module.exports = function(sequelize, DataTypes) {
  var Cart = sequelize.define('Cart', {
    name: DataTypes.STRING,
    price: DataTypes.FLOAT,
    amt: DataTypes.INTEGER,
    totalprice: DataTypes.FLOAT
  }, {
    classMethods: {
      associate: function(models) {
      }
    }
  });
  return Cart;
};
