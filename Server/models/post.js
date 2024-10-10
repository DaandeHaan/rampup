'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate(models) {
      // define association here
      Post.belongsTo(models.Account, { foreignKey: 'accountID' });
      Post.belongsTo(models.Category, { foreignKey: 'categoryID' });
      Post.hasMany(models.Comment, { foreignKey: 'postID' });
      Post.hasMany(models.Like, { foreignKey: 'postID' });
    }
  }
  Post.init({
    postID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    accountID: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Accounts',
        key: 'accountID',
      },
    },
    categoryID: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Categories',
        key: 'categoryID',
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
    modelName: 'Post',
    timestamps: false, // Disable createdAt and updatedAt
  });
  return Post;
};
