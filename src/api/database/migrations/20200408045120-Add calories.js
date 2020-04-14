'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([queryInterface.addColumn(
      'Recipes',
      'calorie',
      {
        type: Sequelize.INTEGER,
        allowNull: true,
        after: 'hot'
      },
    )]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Recipes', 'calorie');
  }
};
