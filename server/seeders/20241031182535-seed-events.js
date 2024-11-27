'use strict';
const { faker } = require('@faker-js/faker')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const events = [];
    for (let i = 0; i < 10; i++) {
      events.push({
        name: faker.company.name(),
        start_date: faker.date.soon(30),
        end_date: faker.date.soon(60),
        image: faker.image.url(640, 480),
        location: faker.location.city(),
        description: faker.lorem.sentence(),
        status: faker.helpers.arrayElement(['ativo', 'inativo']),
        user_id: faker.number.int({ min: 10, max: 13 }),
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }
    await queryInterface.bulkInsert('Events', events, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Events', null, {});
  }
};
