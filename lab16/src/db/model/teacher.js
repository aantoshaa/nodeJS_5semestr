const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('teacher', {
        teacher: {
            type: Sequelize.STRING,
            primaryKey: true,
        },
        teacher_name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        pulpit: {
            type: Sequelize.STRING,
            allowNull: false
        }
    }, {
        timestamps: false,
        tableName: 'teacher'
    })
};
