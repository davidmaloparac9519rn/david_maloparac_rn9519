'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Trains', [
      {
        name: 'Train1',
        number_of_seats: 151,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Train2',
        number_of_seats: 152,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Train3',
        number_of_seats: 153,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Train4',
        number_of_seats: 154,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Train5',
        number_of_seats: 155,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.bulkDelete('Trains', null, {});
  }
};
