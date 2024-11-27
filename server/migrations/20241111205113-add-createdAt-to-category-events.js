'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('event_categories', 'createdAt', {
      allowNull: false,
      type: Sequelize.DATE
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('event_categories', 'createdAt');
  }
};
