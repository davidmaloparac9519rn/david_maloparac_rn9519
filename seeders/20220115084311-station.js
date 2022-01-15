'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Stations', [
      {
        name: 'Station1',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Station2',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Station3',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Station4',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Station5',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.bulkDelete('Stations', null, {});
  }
};
