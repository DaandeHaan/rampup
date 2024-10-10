'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Accounts', [
      {
        username: 'RampupAdmin',
        name: 'Ramup Admin',
        email: 'rampup@hu.nl',
        password: '$2a$10$TKgKdaeyI.kRcps23b1iLea.90rU3dVU2sazQDMKDenmeWMoCYaym',
        permissionID: 1, // Provides admin permissions
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Accounts', { email: 'testuser@example.com' }, {});
  }
};
