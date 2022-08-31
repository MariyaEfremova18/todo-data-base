'use strict'
export default (sequelize, DataTypes) => {
    const Task = sequelize.define('task', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        done: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    })
    return Task;
};
