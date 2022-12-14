'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Comments', {
      // id:DataTypes.STRING,
      // email:DataTypes.STRING,
      // firstName: DataTypes.STRING,
      // lastName: DataTypes.STRING,
      // address: DataTypes.STRING,
      // gender: DataTypes.STRING,
      // roleid:DataTypes.STRING
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      content:{
        type:Sequelize.TEXT('long')
      },
      username:{
        type:Sequelize.STRING
      },
      bookId:{
        type:Sequelize.INTEGER
      },
      rating:{
        type:Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Comments');
  }
};