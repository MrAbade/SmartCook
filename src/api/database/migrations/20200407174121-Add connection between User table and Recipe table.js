'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Recipes',
      'userId',
      {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: 'Users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        after: 'hot'
      },
    );
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.removeColumn('Recipes', 'userId');
  }
};
