const bcrypt = require('bcryptjs');
const { Account, Permission, Follow } = require('../models');
const logMessage = require('../logs/logger');
const ErrorException = require('../ErrorException');
const UserDTO = require('../dtos/UserDTO');
const { Sequelize } = require('sequelize');

class AccountService {
    async getAccounts() {
      const accounts = await Account.findAll({
        include: [
          {
            model: Follow,
            as: 'followers',
            where: { followedID: Sequelize.col('Account.accountID') },
            required: false
          },
          {
            model: Follow,
            as: 'following',
            where: { followerID: Sequelize.col('Account.accountID') },
            required: false
          }
        ]
      });
      
      return accounts.map(account => new UserDTO(account));
    }

    async getAccountById(id) {
      const account = await Account.findByPk(id, {
        include: [
          {
            model: Follow,
            as: 'followers',
            where: { followedID: id },
            required: false
          },
          {
            model: Follow,
            as: 'following',
            where: { followerID: id },
            required: false
          }
        ]
      });

      if (!account) 
        throw new ErrorException(404, 'ACCOUNT_NOT_FOUND');

      return new UserDTO(account);
    }

    async createAccount(body, permissionID = 3) {
      const payload = {...body, permissionID};
        // Validate the request body
        const validation = this.validateBody(payload);

        if (!validation.success)
            throw new ErrorException(400, validation.message);

        // Generate hashed password
        const passwordResult = this.generatePassword(body.password);

        try {
            let newAccount = await Account.create({
                username: body.username,
                name: body.name,
                email: body.email,
                password: passwordResult,
                permissionID: permissionID,
            });

            logMessage('debug', `Created an account for ${body.username}.`);
            return newAccount;
        } catch (error) {
            logMessage('error', `Something went wrong while creating an account for ${body.username}. Error: ${error}`);
            throw new ErrorException(500, 'UNKNOWN_ERROR');
        }
    }

    async updatePermission(accountID, permissionID) {

        // Check if the permission exists
        const permissions = await Permission.findAll();
        const permissionIDs = permissions.map(permission => permission.permissionID);
        if (!permissionIDs.includes(parseInt(permissionID)))
          throw new ErrorException(404, 'PERMISSION_NOT_FOUND');

        // Check if the account exists
        const account = await Account.findByPk(accountID);
        if (!account) 
          throw new ErrorException(404, 'ACCOUNT_NOT_FOUND');

        // Update the permission
        account.permissionID = permissionID;
        await account.save();
        return { success: true };
    }

    validateBody(body) {
        const userRegex = /^[0-9A-Za-z]{6,16}$/;
        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
                
        if (!body) 
          return { success: false, message: 'MISSING_BODY' };

        if (!body.username) 
          return { success: false, message: 'MISSING_USERNAME' };

        if (!userRegex.test(body.username)) 
          return { success: false, message: 'INVALID_USERNAME' };

        if (!body.name) 
          return { success: false, message: 'MISSING_NAME' };

        if (!body.email) 
          return { success: false, message: 'MISSING_EMAIL' };

        if (!emailRegex.test(body.email)) 
          return { success: false, message: 'INVALID_EMAIL' };

        if (!body.password) 
          return { success: false, message: 'MISSING_PASSWORD' };

        if (!passwordRegex.test(body.password)) 
          return { success: false, message: 'INVALID_PASSWORD' };

        if (!body.permissionID) 
          return { success: false, message: 'MISSING_PERMISSION' };

        return { success: true };
    }

    generatePassword(password) {
        return bcrypt.hashSync(password, 10);
    }
}

module.exports = new AccountService();
