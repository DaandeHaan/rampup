const { Follow } = require('../models/index.js');
const ErrorException = require('../ErrorException.js');

class followService {

    async followUser(followerID, followedID) {
        // Check if user is already following - if so, unfollow
        const followCheck = await Follow.findOne({ where: { followedID, followerID } });
        if (followCheck) {
            await Follow.destroy({ where: { followedID, followerID } });
            return false;
        }
        // Follow user
        const follow = await Follow.create({ followedID, followerID });

        if (!follow)
            throw new ErrorException("Failed to follow user", 500);

        return true;
    }
}

module.exports = new followService();