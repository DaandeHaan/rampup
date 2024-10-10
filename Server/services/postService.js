const ErrorException = require('../ErrorException');
const { Post, Category, Account, Like, Comment, Follow } = require('../models/');
const userPostsDTO = require('../dtos/userPostsDTO');
const sequelize = require('sequelize')
class postService {

    async getPosts(postsIncrement, currentAccountID) {
        const limit = 15;
        const offset = (postsIncrement - 1) * limit;

        const posts = await Post.findAll({
            attributes: {
                include: [
                    [sequelize.fn('COUNT', sequelize.col('Likes.accountID')), 'likeCount'],
                    [
                        sequelize.fn('SUM', sequelize.literal(`CASE WHEN Likes.accountID = ${currentAccountID} THEN 1 ELSE 0 END`)),
                        'likedByCurrentUser'
                    ]
                ]
            },
            include: [
                {
                    model: Account,
                    attributes: ['username'],
                },
                {
                    model: Category,
                    attributes: ['name'],
                },
                {
                    model: Like, // Make sure the association is correct
                    attributes: [],
                }
            ],
            group: ['Post.postID', 'Account.accountID', 'Category.categoryID'],
            order: [['dateCreated', 'DESC']],
            offset: offset,
            limit: 15,
            subQuery: false
        });

        return posts.map(post => {
            return new userPostsDTO(post.dataValues);
        });
    }

    async getFollowingPosts(accountID) {
        const posts = await Post.findAll({
            attributes: {
                include: [
                    [sequelize.fn('COUNT', sequelize.col('Likes.accountID')), 'likeCount'],
                    [
                        sequelize.fn('SUM', sequelize.literal(`CASE WHEN Likes.accountID = ${accountID} THEN 1 ELSE 0 END`)), // accountID is same as currentAccountID
                        'likedByCurrentUser'
                    ]
                ]
            },
            include: [
                {
                    model: Account,
                    attributes: ['username'],
                    required: true,  // Ensures posts are only returned if there's an associated account
                    include: [
                        {
                            model: Follow,
                            as: 'followers',
                            where: { followerID: accountID },  // Filter to only include posts from followed users
                            attributes: [],  // Don't include any fields from the Follow table
                            required: true  // Ensures only posts from followed accounts are returned
                        }
                    ]
                },
                {
                    model: Category,
                    attributes: ['name'],
                },
                {
                    model: Like,
                    attributes: [],
                }
            ],
            group: ['Post.postID', 'Account.accountID', 'Category.categoryID'],
            order: [['dateCreated', 'DESC']],
            subQuery: false
        });

        return posts.map(post => {
            return new userPostsDTO(post.dataValues);
        });
    }
    
    async getPostsByAccountID(accountID, currentAccountID) {
        const posts = await Post.findAll({
            where: { accountID: accountID },
            attributes: {
                include: [
                    [sequelize.fn('COUNT', sequelize.col('Likes.accountID')), 'likeCount'],
                    [
                        sequelize.fn('SUM', sequelize.literal(`CASE WHEN Likes.accountID = ${currentAccountID} THEN 1 ELSE 0 END`)),
                        'likedByCurrentUser'
                    ]
                ]
            },
            include: [
                {
                    model: Account,
                    attributes: ['username'],
                },
                {
                    model: Category,
                    attributes: ['name'],
                },
                {
                    model: Like,
                    attributes: [],
                }
            ],
            group: ['Post.postID', 'Account.accountID', 'Category.categoryID'],
            order: [['dateCreated', 'DESC']],
            subQuery: false
        });

        return posts.map(post => {
            return new userPostsDTO(post.dataValues);
        });
    }

    async getCategories() {
        const categories = await Category.findAll({where: {isDeleted: false}});
        return categories;
    }

    async createPost(body, accountID) {
        this.validateBody(body);
        await Post.create({
            accountID: accountID,
            categoryID: body.categoryID || null,
            body: body.body,
        })
        return;
    }

    async likePost(body, accountID) {
        const like = await Like.findOne({
            where: {
                postID: body.postID, 
                accountID: accountID
            }}
        );

        if (like) 
            await like.destroy();
        else
            await Like.create({
                postID: body.postID,
                accountID: accountID,
            });
    }

    validateBody(body) {
        if (!body) 
            throw new ErrorException(400, 'MISSING_BODY');
        if (!body.body)
            throw new ErrorException(400, 'MISSING_BODY');
    }
}

module.exports = new postService();