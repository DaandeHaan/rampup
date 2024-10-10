# Data Scheme

## Table of Contents
- [Introduction](#introduction)
- [Accounts](#Accounts)
- [Posts](#Posts)
- [Categories](#Categories)
- [Comments](#Comments)
- [Likes](#Likes)
- [Permissions](#Permissions)
- [Conclusion](#conclusion)

## Introduction
This document outlines the data scheme for the Ramp=up project.

## Accounts
accountID    | PrimaryID
username     | String
name         | String
email        | String
password     | String (HASH)
permissionID | Relative to permissionID
dateCreated  | DATE
isDeleted    | Bool

## Posts
postID      | PrimaryID
accountID   | Relative to accountID
categoryID  | Relative to categoryID
body        | String
likes       | INT
comments    | INT
dateCreated | DATE
isDeleted   | Bool

## Categories
categoryID  | PrimaryID
name        | String
relatedPosts| INT
dateCreated | DATE
isDeleted   | isDeleted

## Comments
commentID        | PrimaryID
parrentCommentID | Relative to commentID - CAN BE NULL
postID           | Relative to postID
accountID        | Relative to accountID
body             | String
dateCreated      | DATE
isDeleted        | Bool

## Likes
likeID      | PrimaryID
postID      | Relative to postID
accountID   | Relative to accountID
dateCreated | DATE

## Permissions
permissionID | PrimaryID
name         | String

## Code
CREATE DATABASE data;

use data;

CREATE TABLE accounts (
  accountID INT PRIMARY KEY,
  username VARCHAR(255),
  name VARCHAR(255),
  email VARCHAR(255),
  password VARCHAR(255),
  permissionID INT,
  dateCreated DATE,
  isDeleted BOOLEAN
);

CREATE TABLE categories (
  categoryID INT PRIMARY KEY,
  name VARCHAR(255),
  relatedPosts INT,
  dateCreated DATE,
  isDeleted BOOLEAN
);


CREATE TABLE posts (
  postID INT PRIMARY KEY,
  accountID INT,
  categoryID INT,
  body TEXT,
  likes INT,
  comments INT,
  dateCreated DATE,
  isDeleted BOOLEAN,
  FOREIGN KEY (accountID) REFERENCES accounts(accountID),
  FOREIGN KEY (categoryID) REFERENCES categories(categoryID)
);

CREATE TABLE comments (
  commentID INT PRIMARY KEY,
  parentCommentID INT,
  postID INT,
  accountID INT,
  body TEXT,
  dateCreated DATE,
  isDeleted BOOLEAN,
  FOREIGN KEY (parentCommentID) REFERENCES comments(commentID),
  FOREIGN KEY (postID) REFERENCES posts(postID),
  FOREIGN KEY (accountID) REFERENCES accounts(accountID)
);

CREATE TABLE likes (
  likeID INT PRIMARY KEY,
  postID INT,
  accountID INT,
  dateCreated DATE,
  FOREIGN KEY (postID) REFERENCES posts(postID),
  FOREIGN KEY (accountID) REFERENCES accounts(accountID)
);

CREATE TABLE permissions (
  permissionID INT PRIMARY KEY,
  name VARCHAR(255)
);

## Conclusion
The data scheme provides a structured representation of the project's data.