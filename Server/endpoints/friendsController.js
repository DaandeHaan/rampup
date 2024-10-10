const express = require("express");
const asyncHandler = require('express-async-handler');
const ErrorException = require("../ErrorException");
const authenticateToken = require("../middleware/authMiddleware");
const postService = require("../services/postService");
const router = express.Router();

router.get("/", authenticateToken, asyncHandler(async (req, res) => {
    let currentAccountID = req.user.accountID;

    const result = await postService.getFollowingPosts(currentAccountID)

    res.json({succes: true, posts: result})
}))

module.exports = router;
