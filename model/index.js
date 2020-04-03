const Sequelize = require('sequelize');

const dbConfig = require('../config/dbConfig');

const sequelize = new Sequelize(dbConfig.db, dbConfig.user, dbConfig.password, {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    operatorsAliases: false
});

const botModel = require('./botModel');

module.exports = {
    Sequelize,
    sequelize,
    bot: botModel(sequelize, Sequelize)
}