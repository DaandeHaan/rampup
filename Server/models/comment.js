'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    static associate(models) {
      // define association here
      Comment.belongsTo(models.Comment, { foreignKey: 'parentCommentID' });
      Comment.belongsTo(models.Post, { foreignKey: 'postID' });
      Comment.belongsTo(models.Account, { foreignKey: 'accountID' });
    }
  }
  Comment.init({
    commentID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    parentCommentID: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Comments',
        key: 'commentID',
      },
      allowNull: true,
    },
    postID: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Posts',
        key: 'postID',
      },
    },
    accountID: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Accounts',
        key: 'accountID',
      },
    },
    body: DataTypes.TEXT,
    dateCreated: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    }, {
    sequelize,
    modelName: 'Comment',
    timestamps: false, // Disable createdAt and updatedAt
  });
  return Comment;
};
