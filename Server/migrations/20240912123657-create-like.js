'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Likes', {
      likeID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      postID: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Posts',
          key: 'postID',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      accountID: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Accounts',
          key: 'accountID',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      dateCreated: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Likes');
  }
};
