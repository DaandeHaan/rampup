'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Permissions', [
      {
        permissionID: 1,
        name: 'admin',
      },
      {
        permissionID: 2,
        name: 'write',
      },
      {
        permissionID: 3,
        name: 'read',
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Permissions', null, {});
  }
};