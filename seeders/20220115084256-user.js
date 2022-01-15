const bcrypt = require('bcrypt');

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
     await queryInterface.bulkInsert('Users', [
    {
      name: 'John Doe',
      email: 'johnDoe@gmail.com',
      password: bcrypt.hashSync('test1', 10),
      type: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'David Maloparac',
      email: 'dmaloparac9519rn@raf.rs',
      password: bcrypt.hashSync('test1', 10),
      type: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Random Name',
      email: 'randomname@gmail.com',
      password: bcrypt.hashSync('test1', 10),
      type: 'moderator',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Random Name1',
      email: 'randomname1@gmail.com',
      password: bcrypt.hashSync('test1', 10),
      type: 'standard',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Random Name2',
      email: 'randomname2@gmail.com',
      password: bcrypt.hashSync('test1', 10),
      type: 'standard',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ], {});
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.bulkDelete('Users', null, {});
  }
};
