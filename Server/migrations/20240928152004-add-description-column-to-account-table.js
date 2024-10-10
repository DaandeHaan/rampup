'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Accounts', 'description', {
      type: Sequelize.STRING, // or Sequelize.TEXT for longer text
      allowNull: true
    });
  },

  async down(queryInterface, Sequelize) {
    // Reverting the addition of the 'description' column
    await queryInterface.removeColumn('Accounts', 'description');
  },
};
