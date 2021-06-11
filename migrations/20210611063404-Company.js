'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('company', 'fleet', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn('company', 'stack', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.removeColumn('company', 'fleet');
    queryInterface.removeColumn('company', 'stack');
  },
};
