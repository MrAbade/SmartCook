'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('Recipes', 'preparationMethod', {
        type: Sequelize.TEXT,
        allowNull: false,
        after: 'description',
      }),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Recipes', 'preparationMethod');
  }
};
