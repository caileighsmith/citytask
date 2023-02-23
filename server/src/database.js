const {Sequelize, DataTypes} = require('sequelize')

const sequelize = new Sequelize('sqlite:memory')

const User = sequelize.define('User', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    admin: DataTypes.BOOLEAN
})

const Task = sequelize.define('Task', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    value: DataTypes.INTEGER,
    comission: DataTypes.DECIMAL,
    taken: DataTypes.BOOLEAN,
    assignedUser: DataTypes.STRING
})

module.exports={
    sequelize,
    User,
    Task
}