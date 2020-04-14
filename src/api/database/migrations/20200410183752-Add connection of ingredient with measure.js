'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Ingredients', 'measureId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: { model: 'Measures', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Ingredients', 'measureId');
  }
};
