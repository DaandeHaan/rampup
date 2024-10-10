const express = require("express");
const asyncHandler = require('express-async-handler');
const authService = require("../../services/authService");
const ErrorException = require("../../ErrorException");
const router = express.Router();

router.post("/", asyncHandler(async (req, res) => {
    const body = req.body
    if (!body.password || !body.email)
        throw new ErrorException(400, "INVALID_CREDENTIALS")

    // If the authService does not throw an error the login is succesfull.
    const token = await authService.login(body)

    res.cookie('token', token, {
        httpOnly: true,
        maxAge: 60 * 60 * 1000
    })

    return res.json({ success: true });
}))

router.post('/logout', (req, res) => {
    res.clearCookie('token');
    res.json({ message: 'Logged out successfully' });
});

module.exports = router;
