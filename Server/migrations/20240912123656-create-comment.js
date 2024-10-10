'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Comments', {
      commentID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      parentCommentID: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Comments',
          key: 'commentID',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
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
      body: {
        type: Sequelize.TEXT,
        allowNull: false,
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
    await queryInterface.dropTable('Comments');
  }
};
