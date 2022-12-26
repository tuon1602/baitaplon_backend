'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Book.hasMany(models.Cart,{foreignKey:"bookId"})
      Book.hasMany(models.Order,{foreignKey:"bookId"})
      

    }
  };
  Book.init({ 
    name: DataTypes.STRING,
    author: DataTypes.STRING,
    description: DataTypes.TEXT('long'),
    category: DataTypes.STRING,
    pageCounter: DataTypes.STRING,
    dateCreated:DataTypes.STRING,
    // email:DataTypes.STRING,
    // password:DataTypes.STRING,
    // firstName: DataTypes.STRING,
    // lastName: DataTypes.STRING,
    // address: DataTypes.STRING,
    // gender: DataTypes.BOOLEAN,
    // roleId:DataTypes.STRING,
    // phoneNumber:DataTypes.STRING,
    // positionId:DataTypes.STRING,
    image: DataTypes.TEXT('long')
  }, {
    sequelize,
    modelName: 'Book',
  });
  return Book;
};