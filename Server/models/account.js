'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Account extends Model {
    static associate(models) {
      // define association here
      Account.belongsTo(models.Permission, { foreignKey: 'permissionID' });
      Account.hasMany(models.Post, { foreignKey: 'accountID' });
      Account.hasMany(models.Comment, { foreignKey: 'accountID' });
      Account.hasMany(models.Like, { foreignKey: 'accountID' });
    
      // Follow associations with distinct aliases
      Account.hasMany(models.Follow, { foreignKey: 'followedID', as: 'followers'});
      Account.hasMany(models.Follow, { foreignKey: 'followerID', as: 'following' });
    }
    
  }
  Account.init({
    accountID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: DataTypes.STRING,
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    description: DataTypes.STRING,
    password: DataTypes.STRING,
    permissionID: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Permissions',
        key: 'permissionID',
      },
    },
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
    modelName: 'Account',
    timestamps: false, // Disable createdAt and updatedAt
  });
  return Account;
};
