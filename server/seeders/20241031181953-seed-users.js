'use strict';
const bcrypt = require('bcryptjs');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    const hashedPassword = await bcrypt.hash('123456', 10);
    await queryInterface.bulkInsert('Users', [{
      username: "admin",
      email: "admin@gmail.com",
      password: hashedPassword,
      role: "admin"
    },
    {
      username: "guest",
      email: "guest@gmail.com",
      password: hashedPassword,
      role: "user"
    },
    {
      username: "produtor",
      email: "produtor@gmail.com",
      password: hashedPassword,
      role: "admin"
    },
    {
      username: "cliente",
      email: "cliente@gmail.com",
      password: hashedPassword,
      role: "user"
    }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
