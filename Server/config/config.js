require('dotenv').config();
// require('dotenv').config({path: '../.env'});

module.exports = {
  "development": {
    "username": process.env.LOCAL_USER || "root",
    "password": process.env.LOCAL_PASS || "mysql",
    "database": process.env.LOCAL_NAME,
    "host": process.env.LOCAL_HOST || "127.0.0.1",
    "dialect": "mysql",
    "logging": false,
    "seederStorage": "json"
  },
  "test": {
    "username": process.env.USER,
    "password": process.env.PASS,
    "database": "database_test",
    "host": process.env.HOST,
    "dialect": "mysql",
    "seederStorage": "json",
  },
  "production": {
    "username": process.env.USER,
    "password": process.env.PASS,
    "database": "database_production",
    "host": process.env.HOST,
    "dialect": "mysql",
    "seederStorage": "json",
  }
};
