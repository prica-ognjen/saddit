'use strict'

const{Model} = require('sequelize')

module.exports = (sequelize, DataTypes) => {
    class UserHasRoles extends Model{
        
        static associate({Roles, Users}){
            this.belongsTo(Roles, {
                foreignKey: 'role_id'
            })
            this.belongsTo(Users, {
                foreignKey: 'user_id',
                onDelete: 'cascade',
            })
        }
    }
    UserHasRoles.init({
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        role_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        }
    },{
        sequelize,
        modelName: 'UserHasRoles',
        freezeTableName: true
    })
    return UserHasRoles
}