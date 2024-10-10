// This is for the data that will be put into the JWT and that will be put in the req.user at the authMiddleware
class userAuthDTO {
    constructor({accountID, email, permissionID}) {
        this.accountID = accountID;
        this.email = email; 
        this.permissionID = permissionID; 
    }
}

module.exports = userAuthDTO;