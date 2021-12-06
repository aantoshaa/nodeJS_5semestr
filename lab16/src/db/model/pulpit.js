const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('pulpit', {
        pulpit: {
            type: Sequelize.STRING,
            primaryKey: true,
        },
        pulpit_name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        faculty: {
            type: Sequelize.STRING,
            allowNull: false
        }
    }, {
        timestamps: false,
        tableName: 'pulpit'
    })
};
