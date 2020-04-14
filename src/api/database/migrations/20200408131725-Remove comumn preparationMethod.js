'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Recipes', 'preparationMethod');
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([queryInterface.addColumn(
      'Recipes',
      'preparationMethod',
      {
        type: Sequelize.STRING,
        allowNull: true,
        after: 'description'
      },
    )]);
  }
};
