'use strict'

const{Model} = require('sequelize')

module.exports = (sequelize, DataTypes) => {
    class Comments extends Model{
        
        static associate({Users, Posts}){
            this.belongsTo(Users, {
                foreignKey: 'user_id'
            })
            this.belongsTo(Posts, {
                foreignKey: 'post_id'
            })
        }
    }
    Comments.init({
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        post_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        content: {
            type: DataTypes.STRING(200),
            allowNull: false,
        },
        date_commented: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        likes: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        dislikes: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        }
    },{
        sequelize,
        modelName: 'Comments',
    })
    return Comments
}