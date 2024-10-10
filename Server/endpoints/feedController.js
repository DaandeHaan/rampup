const express = require("express");
const asyncHandler = require('express-async-handler');
const ErrorException = require("../ErrorException");
const authenticateToken = require("../middleware/authMiddleware");
const postService = require("../services/postService");
const router = express.Router();

router.get("/posts/:postIncrement", authenticateToken, asyncHandler(async (req, res) => {
    let postsIncrement = req.params.postIncrement || 1;
    let currentAccountID = req.user.accountID

    const result = await postService.getPosts(postsIncrement, currentAccountID);

    res.json({result: result})
}))

router.get("/categories", authenticateToken, asyncHandler(async (req, res) => {
    const result = await postService.getCategories()
    res.json({succes: true, result: result})
}))

router.post("/post", authenticateToken, asyncHandler(async (req, res) => {
    if (req.user.permissionID === 3) // User has read-only permission
        throw new ErrorException(403, 'PERMISSION_DENIED');

    postService.createPost(req.body, req.user.accountID)

    return res.json({success: true})
}));

router.post("/like", authenticateToken, asyncHandler(async (req, res) => {
    await postService.likePost(req.body, req.user.accountID)
    return res.json({success: true})
}));

module.exports = router;
