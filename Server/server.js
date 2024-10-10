const express = require('express')
var cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express()
const port = 3001

const { authController, accountController, friendsController, feedController, profileController, adminUsersController, followController} = require('./endpoints');
const logMessage = require('./logs/logger')
const exceptionMiddleware = require('./middleware/exceptionMiddleware');
const ErrorException = require('./ErrorException');

const path = require('path');
require('dotenv').config();
// require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

app.use(cors({
  origin: true, // Allow all origins
  credentials: true // Allow credentials
}));

app.use(express.json({ limit: '1000mb' }));
app.use(cookieParser());

app.use('/api/auth', authController);
app.use('/api/account', accountController);
app.use('/api/feed', feedController);
app.use('/api/profile', profileController);
app.use('/api/follow', followController);
app.use('/api/friends', friendsController);
app.use('/api/admin/users', adminUsersController);

// * This is a catch-all route handler. If the client makes a request to an endpoint that doesn't exist, this handler will be called.
app.use(function(req, res) {
    throw new ErrorException(404, 'Resource not found');
}); 

// Apply the exception middleware (must be the last middleware)
app.use(exceptionMiddleware);

app.listen(port, () => {
  logMessage('info', `Server listening at http://localhost:${port}/api`)
})