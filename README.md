# Ramp-Up Guide

Before you begin, ensure you have the following installed on your machine:

- Node.js (v14.x or later)
- npm (Node package manager, included with Node.js)
- MySQL or another supported SQL database

## Table of Contents
- [Install Guide](#install-guide)
  - [Dependencies](#dependencies)
  - [Database Setup](#database-setup)
  - [Running the Application](#running-the-application)

## Install Guide

### Dependencies

Run in the "server" and "client" directory
```bash
npm i
```

### Database Setup

1. Log into your database
```bash
mysql -u root -p
```

2. Create database
```bash
create database database_development
```

3. Add the database credentials to the .env file 

4. After you created the database you can run the Sequelize migrations (From NodeJS terminal)
```bash
npx sequelize-cli db:migrate
```

5. Seed the tables
```bash
npx sequelize db:seed:all
```

### Running the Application
To run the frontend application, enter the Client directory
```bash
npm run start
```

To run the backend, enter the Server directory
```bash
npm run dev
```
