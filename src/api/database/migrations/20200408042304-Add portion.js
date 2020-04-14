'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'Ingredients',
        'portion',
        {
          type: Sequelize.INTEGER,
          allowNull: false,
          after: 'name'
        },
      ),
      queryInterface.addColumn(
        'Ingredients',
        'mass',
        {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          after: 'name'
        },
      ),
      queryInterface.addColumn(
        'Ingredients',
        'quantity',
        {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          after: 'name'
        },
      ),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('Ingredients', 'portion'),
      queryInterface.removeColumn('Ingredients', 'mass'),
      queryInterface.removeColumn('Ingredients', 'quantity')
    ]);
  }
};
