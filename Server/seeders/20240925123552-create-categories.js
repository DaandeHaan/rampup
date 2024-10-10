'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Categories', [
      {
        categoryID: 1,
        name: 'Technology',
      },
      {
        categoryID: 2,
        name: 'Health',
      },
      {
        categoryID: 3,
        name: 'Education',
      },
      {
        categoryID: 4,
        name: 'Entertainment',
      },
      {
        categoryID: 5,
        name: 'Sports',
      },
      {
        categoryID: 6,
        name: 'News',
      },
      {
        categoryID: 7,
        name: 'Business',
      },
      {
        categoryID: 8,
        name: 'Science',
      },
      {
        categoryID: 9,
        name: 'Art & Culture',
      },
      {
        categoryID: 10,
        name: 'Humor',
      },
      {
        categoryID: 11,
        name: 'Travel',
      },
      {
        categoryID: 12,
        name: 'Food',
      },
      {
        categoryID: 13,
        name: 'Finance',
      },
      {
        categoryID: 14,
        name: 'Environment',
      },
      {
        categoryID: 15,
        name: 'Personal Development',
      },
      {
        categoryID: 16,
        name: 'Relationships',
      },
      {
        categoryID: 17,
        name: 'Fashion',
      },
      {
        categoryID: 18,
        name: 'Automotive',
      },
      {
        categoryID: 19,
        name: 'Music',
      },
      {
        categoryID: 20,
        name: 'Politics',
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Categories', null, {});
  }
};
