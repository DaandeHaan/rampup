class UserDTO {
    constructor({ accountID, username, name, email, description, permissionID, followers = [], following = [] }) {
        this.accountID = accountID;
        this.name = name;
        this.username = username;
        this.email = email;
        this.description = description;
        this.permissionID = permissionID;
        this.followers = followers.map(follow => follow.followerID);
        this.following = following.map(follow => follow.followedID);
    }
}

module.exports = UserDTO;
