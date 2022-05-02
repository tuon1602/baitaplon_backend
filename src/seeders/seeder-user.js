'use strict';

module.exports = {
  // email:DataTypes.STRING,
  // password:DataTypes.STRING,
  // firstName: DataTypes.STRING,
  // lastName: DataTypes.STRING,
  // address: DataTypes.STRING,
  // gender: DataTypes.BOOLEAN,
  // roleid:DataTypes.STRING
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert/*chen` nhieu` ban ghi 1 luc */('Users', [{
      email: 'admin@gmail.com',
      password:'123456',
      firstName: 'Tuon',
      lastName: 'Nguyen',
      address: 'VN',
      gender:1,
      typeRole:'ROLE',
      keyRole:'R1',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
