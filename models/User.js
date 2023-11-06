const Sequelize = require("sequelize");
const db = require("../db/connection");

const User = db.define("User", {
    name: Sequelize.STRING,
    age: Sequelize.NUMBER
})

module.exports = User;