'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    static associate(models) {
      // define association here
      Like.belongsTo(models.Post, { foreignKey: 'postID' });
      Like.belongsTo(models.Account, { foreignKey: 'accountID' });
    }
  }
  Like.init({
    likeID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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
    dateCreated: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  }, {
    sequelize,
    modelName: 'Like',
    timestamps: false, // Disable createdAt and updatedAt
  });
  return Like;
};
