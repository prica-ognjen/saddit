'use strict'

const{Model} = require('sequelize')

module.exports = (sequelize, DataTypes) => {
    class Users extends Model{

        static associate({Messages, Posts, UserHasRoles, Comments}){
            this.hasMany(Messages, {
                foreignKey: 'to'
            })
            this.hasMany(Messages, {
                foreignKey: 'from',
                onDelete: 'cascade',
                hooks: true
            })
            this.hasMany(Posts, {
                foreignKey: 'user_id',
                onDelete: 'cascade', 
                hooks: true
            })
            this.hasMany(UserHasRoles,{
                foreignKey: 'user_id'
            })
            this.hasMany(Comments,{
                foreignKey: 'user_id',
                onDelete: 'cascade', 
                hooks: true
            })
        }
    }
    Users.init({
        id: {
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.INTEGER,
        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        first_name: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        last_name: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        username: {
            type: DataTypes.STRING(200),
            unique: true
        },
        rank: {
            type: DataTypes.STRING(200),
            allowNull: false,
            defaultValue: 'Noob'
        },
        birth_date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        country: {
            type: DataTypes.STRING(56),
            allowNull: false
        },
        enabled: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        refreshToken: {
            type: DataTypes.STRING,
        }
    },{
        sequelize,
        modelName: 'Users',
    })
    return Users
}