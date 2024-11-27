const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("fastsnackdb", "root", "", {
    host: "localhost",
    dialect: "mysql",

})

module.exports = sequelize;