'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Tickets', 'quantity', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 1
    })
    await queryInterface.addColumn('Tickets', 'available_quantity', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 1
    })

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Tickets', 'quantity');
    await queryInterface.removeColumn('Tickets', 'available_quantity');
  }
};
