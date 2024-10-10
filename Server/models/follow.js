'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Follow extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Follow.belongsTo(models.Account, { foreignKey: 'followedID' });
      Follow.belongsTo(models.Account, { foreignKey: 'followerID' });
    }
  }
  Follow.init({
    followID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    followedID: {  // User that is being followed
      type: DataTypes.INTEGER,
      references: {
        model: 'Accounts',
        key: 'accountID',
      },
    },
    followerID: { // The ID of the user that is following you.
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
    modelName: 'Follow',
    timestamps: false,
  });
  return Follow;
};