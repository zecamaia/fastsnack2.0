'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Events', 'location', {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ""
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Events', 'location');
  }
};
