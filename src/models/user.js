'use strict';
const {
  Model
} = require('sequelize');
const cart = require('./cart');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Cart,{foreignKey:"userId"})
      User.hasMany(models.Order,{foreignKey:"userId"})
      
    }
  };
  User.init({ 
    email:DataTypes.STRING,
    password:DataTypes.STRING,
    username: DataTypes.STRING,
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};