'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Rides', [
      {
        name: 'Ride1',
        number_of_passengers: 121,
        train_id: 1,
        start_id: 1,
        end_id: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Ride2',
        number_of_passengers: 122,
        train_id: 2,
        start_id: 3,
        end_id: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Ride3',
        number_of_passengers: 123,
        train_id: 3,
        start_id: 4,
        end_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Ride4',
        number_of_passengers: 124,
        train_id: 4,
        start_id: 1,
        end_id: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Ride5',
        number_of_passengers: 125,
        train_id: 5,
        start_id: 2,
        end_id: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.bulkDelete('Rides', null, {});
  }
};
