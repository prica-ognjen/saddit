'use strict'

const{Model} = require('sequelize')

module.exports = (sequelize, DataTypes) => {
    class Roles extends Model{
        
        static associate({UserHasRoles, RoleHasPermissions}){
            this.hasMany(UserHasRoles, {
                foreignKey: 'user_id', 
            })
            this.hasMany(RoleHasPermissions, {
                foreignKey: 'role_id', 
            })
        }
    }
    Roles.init({
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        description: {
            type: DataTypes.STRING(100)
        }
    },{
        sequelize,
        modelName: 'Roles',
        freezeTableName: true
    })
    return Roles
}