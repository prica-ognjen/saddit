'use strict'

const{Model} = require('sequelize')

module.exports = (sequelize, DataTypes) => {
    class Messages extends Model{
        
        static associate({Users}){
            this.belongsTo(Users, {
                foreignKey: 'to'
            })
            this.belongsTo(Users, {
                foreignKey: 'from'
            })
        }
    }
    Messages.init({
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        to: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        from: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        message: {
            type: DataTypes.STRING(200),
            allowNull: false,
        },
        sent_time: {
            type: DataTypes.DATE,
            allowNull: false
        },
        isLiked: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        isRead: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
    },{
        sequelize,
        modelName: 'Messages',
    })
    return Messages
}