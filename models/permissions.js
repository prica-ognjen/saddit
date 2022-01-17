'use strict'

const{Model} = require('sequelize')

module.exports = (sequelize, DataTypes) => {
    class Permissions extends Model{
        
        static associate({RoleHasPermissions}){
            this.hasMany(RoleHasPermissions, {
                foreignKey: 'permission_id', 
            })
        }
    }
    Permissions.init({
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
        modelName: 'Permissions',
        freezeTableName: true
    })
    return Permissions
}