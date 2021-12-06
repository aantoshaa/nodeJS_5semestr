const {Sequelize} = require('sequelize');
const {msConfig} = require('../common/config');
const models = require('./model/index');

const sequelize = new Sequelize(msConfig.database, msConfig.username, msConfig.password, msConfig.option);

const collections = {};
for (const key in models) {
    collections[key] = models[key](sequelize);
}

module.exports = {
    sequelize,
    collections
};