const express = require("express");
const asyncHandler = require('express-async-handler');
const ErrorException = require("../ErrorException");
const authenticateToken = require("../middleware/authMiddleware");
const postService = require("../services/postService");
const followService = require("../services/followService");
const router = express.Router();
router.post("/", authenticateToken, asyncHandler(async (req, res) => {
    const followingAccountID = req.body.followingId;

    if (!followingAccountID)
        throw new ErrorException(400, "MISSING_ACCOUNTID");
    
    const result = await followService.followUser(req.user.accountID, followingAccountID)

    res.json({succes: true, following: result})
}))

module.exports = router;
