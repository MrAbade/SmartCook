'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('Ingredients', 'measureId', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: { model: 'Measures', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('Ingredients', 'measureId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: { model: 'Measures', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    })
  }
};
