'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('Ingredients', 'quantity'),
      queryInterface.removeColumn('Ingredients', 'mass'),
      queryInterface.removeColumn('Ingredients', 'portion'),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('Ingredients', 'quantity', {
        type: Sequelize.DOUBLE,
        allowNull: false,
      }),
      queryInterface.addColumn('Ingredients', 'mass', {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      }),
      Sequelize.addColumn('Ingredients', 'portion', {
        type: Sequelize.DOUBLE,
        allowNull: false,
      }),
    ]);
  }
};
