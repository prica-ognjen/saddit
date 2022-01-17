const express = require('express')
const router = express.Router()
const Joi = require('joi')
const {sequelize, Users, Posts, Comments} = require('../../models');
const { QueryTypes } = require('sequelize');
const ROLES_LIST = require('../../config/rolesList')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

router.route('/')
    .get(async (req, res) => {
        return res.json(await Comments.findAll())
    })
    .post(async (req, res) => {
        const comment = {
            user_id: req.body.user_id,
            post_id: req.body.post_id,
            content: req.body.content,
        }

        const user = await Users.findOne({ where: {id: comment.user_id}})
        if(!user) return res.status(409).json({error: `User with id=${comment.user_id} doesn't exists`})

        const post = await Posts.findOne({ where: {id: comment.post_id}})
        if(!post) return res.status(409).json({error: `Post with id=${comment.post_id} doesn't exists`})

        const { error } = schema.validate(comment);
        if(error) return res.status(409).json(error);

        comment["date_commented"] = new Date()

        createdComment = await Comments.create(comment)

        return res.json({"success" : createdComment})
    })


router.route('/:id')
    .get(async (req, res) => {
        if (!req?.params?.id) return res.status(400).json({ "message": 'Comment ID required' });
        const comment = await Comments.findOne({where:{ id: req.params.id }});
        if (!comment) return res.status(204).json({ 'message': `Post ID ${req.params.id} not found` });
        res.json(comment); 
    })
    .delete(async (req, res) => {
        if (!req?.params?.id) return res.status(400).json({ "message": 'Comment ID required' });
        const comment = await Comments.findOne({ where: { id: req.params.id }});
        if (!comment) return res.status(204).json({ 'message': `Comment ID ${req.body.id} not found` }); 
        const result = await comment.destroy()
        res.json(result);
    })
    .put(async (req, res) => {

        var message = {}

        if (!req?.params?.id) return res.status(400).json({ "message": 'Post ID required' });
        const comment = await Comments.findOne({where: {id: req.params.id}})
        if (!comment) return res.status(204).json({ 'message': `Post ID ${req.body.id} not found` }); 

        var content = ''
        if(req.body.content)
            content = req.body.content

        if(content != '')
            comment.content = content
        
        await comment.save()
        return res.json(comment)
    })

const schema = Joi.object({
    user_id: Joi.number(),
    post_id: Joi.number(),
    content: Joi.string()
        .max(2000)

})

module.exports = router