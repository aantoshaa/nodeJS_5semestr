const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('faculty', {
        faculty: {
            type: Sequelize.STRING,
            primaryKey: true,
        },
        faculty_name: {
            type: Sequelize.STRING,
            allowNull: false
        }
    }, {
        timestamps: false,
        tableName: 'faculty'
    })
};
