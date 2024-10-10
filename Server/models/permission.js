'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Permission extends Model {
    static associate(models) {
      // define association here
      Permission.hasMany(models.Account, { foreignKey: 'permissionID' });
    }
  }
  Permission.init({
    permissionID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Permission',
    timestamps: false, // Disable createdAt and updatedAt
  });
  return Permission;
};
