'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Posts', 'likes');
    await queryInterface.removeColumn('Posts', 'comments');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Posts', 'likes');
    await queryInterface.addColumn('Posts', 'comments');
  }
};
