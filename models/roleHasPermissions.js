'use strict'

const{Model} = require('sequelize')

module.exports = (sequelize, DataTypes) => {
    class RoleHasPermissions extends Model{
        
        static associate({Roles, Permissions}){
            this.belongsTo(Roles, {
                foreignKey: 'role_id', 
            })
            this.belongsTo(Permissions, {
                foreignKey: 'permission_id', 
            })
        }
    }
    RoleHasPermissions.init({
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        role_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        permission_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        }
    },{
        sequelize,
        modelName: 'RoleHasPermissions',
    })
    return RoleHasPermissions
}