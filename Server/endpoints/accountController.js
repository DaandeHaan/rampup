const express = require('express');

const accountService = require('../services/accountService');
const authService = require('../services/authService')

const router = express.Router();
const asyncHandler = require('express-async-handler');
const authenticateToken = require('../middleware/authMiddleware');

// Route handler for creating an account
router.post('/', asyncHandler(async (req, res) => {
  const body = req.body;

  // Call the service to create an account
  let newAccount = await accountService.createAccount(body);

  let token =  authService.generateToken(newAccount);

  res.cookie('token', token, {
    httpOnly: true,
    maxAge: 60 * 60 * 1000
  });

  return res.json({ success: true });
}));

router.get("/all", authenticateToken, asyncHandler(async (req, res) => {
  const result = await accountService.getAccounts();
  return res.json({ success: true, result: result});
}));

router.get("/user", authenticateToken, asyncHandler(async (req, res) => {
  const result = await accountService.getAccountById(req.user.accountID);
  return res.json(result);
}));

module.exports = router;
