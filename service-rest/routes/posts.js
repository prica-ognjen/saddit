const express = require('express')
const router = express.Router()
const Joi = require('joi')
const {sequelize, Users, Posts} = require('../../models');
const { QueryTypes } = require('sequelize');
const ROLES_LIST = require('../../config/rolesList')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

router.route('/')
    .get(async (req, res) => {
        return res.json(await Posts.findAll())
    })
    .post(async (req, res) => {
        const post = {
            user_id: req.body.user_id,
            title: req.body.title,
            description: req.body.description,
         //treba image da ubacim
        }

        const user = await Users.findOne({ where: {id: post.user_id}})
        if(!user) return res.status(409).json({error: `User with id=${post.user_id} doesn't exists`})

        const { error } = schema.validate(post);
        if(error) return res.status(409).json(error);

        post["date_published"] = new Date()

        createdPost = await Posts.create(post)

        return res.json({"success" : createdPost})
    })


router.route('/:id')
    .get(async (req, res) => {
        if (!req?.params?.id) return res.status(400).json({ "message": 'Post ID required' });
        const post = await Posts.findOne({where:{ id: req.params.id }});
        if (!post) return res.status(204).json({ 'message': `Post ID ${req.params.id} not found` });
        res.json(post); 
    })
    .delete(async (req, res) => {
        if (!req?.params?.id) return res.status(400).json({ "message": 'Post ID required' });
        const post = await Posts.findOne({ where: { id: req.params.id }});
        if (!post) return res.status(204).json({ 'message': `Post ID ${req.body.id} not found` }); 
        const result = await post.destroy()
        res.json(result);
    })
    .put(async (req, res) => {

        var message = {}

        if (!req?.params?.id) return res.status(400).json({ "message": 'Post ID required' });
        const post = await Posts.findOne({where: {id: req.params.id}})
        if (!post) return res.status(204).json({ 'message': `Post ID ${req.body.id} not found` }); 

        var title = ''
        if(req.body.title)
            title = req.body.title

        var description = ''

        if(req.body.description){
            description = req.body.description
        }
       
        if(title != '')
            post.title = title
        
        post.description = description
        
        await post.save()
        return res.json(post)
    })

const schema = Joi.object({
    title: Joi.string()
        .max(50)
        .required(),
    description: Joi.string()
        .max(2000)
        .required(),
    user_id: Joi.number()

})

module.exports = router