'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Orders', 'qr_code_url', {
      type: Sequelize.TEXT,  // Usar TEXT para armazenar grandes strings (Base64)
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Orders', 'qr_code_url', {
      type: Sequelize.STRING,  // Ou outro tipo que preferir
      allowNull: true,
    });
  }
};
