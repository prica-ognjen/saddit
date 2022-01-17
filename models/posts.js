'use strict'

const{Model} = require('sequelize')

module.exports = (sequelize, DataTypes) => {
    class Posts extends Model{
        
        static associate({Users, Comments}){
            this.belongsTo(Users, {
                foreignKey: 'user_id'
            })
            this.hasMany(Comments, {
                foreignKey: 'post_id'
            })
        }
    }
    Posts.init({
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        date_published: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        image: {
            type: DataTypes.BLOB,
            //allowNull: false,
        },
        description: {
            type: DataTypes.STRING(2000)
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
        },
        saves: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
    },{
        sequelize,
        modelName: 'Posts',
    })
    return Posts
}