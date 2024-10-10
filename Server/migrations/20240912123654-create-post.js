'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Posts', {
      postID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      accountID: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Accounts',
          key: 'accountID',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      categoryID: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Categories',
          key: 'categoryID',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      body: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      likes: {
        type: Sequelize.INTEGER,
      },
      comments: {
        type: Sequelize.INTEGER,
      },
      dateCreated: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      isDeleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Posts');
  }
};
