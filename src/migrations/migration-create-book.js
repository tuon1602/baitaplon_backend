'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Books', {
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
      name:{
        type:Sequelize.STRING
      },
      description:{
        type:Sequelize.TEXT('long')
      },
      author:{
        type:Sequelize.STRING
      },
      category:{
        type: Sequelize.STRING
      },
      pageCounter:{
        type: Sequelize.STRING
      },
      dateCreated:{
        type: Sequelize.STRING
      },
      image: {
        type: Sequelize.TEXT('long')
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
    await queryInterface.dropTable('Books');
  }
};