const express = require("express");
const asyncHandler = require('express-async-handler');
const ErrorException = require("../ErrorException");
const authenticateToken = require("../middleware/authMiddleware");
const postService = require("../services/postService");
const accountService = require("../services/accountService");
const router = express.Router();
router.get("/:accountID/account", authenticateToken, asyncHandler(async (req, res) => {
    const result = await accountService.getAccountById(req.params.accountID);
    return res.json({success: true, result: result});
}))

router.get("/:accountID/posts", authenticateToken, asyncHandler(async (req, res) => {
    let currentAccountID = req.user.accountID

    const result = await postService.getPostsByAccountID(req.params.accountID, currentAccountID);
    return res.json({success: true, result: result});
}))

module.exports = router;
