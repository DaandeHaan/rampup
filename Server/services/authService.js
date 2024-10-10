const ErrorException = require('../ErrorException')
const { Account } = require('../models')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class authService {
    async login(body) {
        // Extract mail and password from body
        const {email, password} = body

        // Find account in the database
        const account = await Account.findOne({where: {email: email}})

        if (!account)
            throw new ErrorException(401, "INVALID_EMAIL_OR_PASSWORD")

        if(!bcrypt.compareSync(password, account.password))
            throw new ErrorException(401, "INVALID_EMAIL_OR_PASSWORD")

        return this.generateToken(account);
    }

    generateToken(account) {
        const token = jwt.sign(
            { 
                accountID: account.accountID, 
                email: account.email, 
                permissionID: account.permissionID
            },
            process.env.JWT_KEY,
            { expiresIn: '60m' }
        );
        return token;
    }
}

module.exports = new authService();