const express = require('express')
const router = express.Router()
const Joi = require('joi')
const {sequelize, Users, Messages} = require('../../models');
const { QueryTypes } = require('sequelize');
const ROLES_LIST = require('../../config/rolesList')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

router.route('/')
    .get(async (req, res) => {
        return res.json(await Messages.findAll())
    })
    .post(async (req, res) => {

        const message = {
            to: req.body.from,
            from: req.body.to,
            message: req.body.message,
        }

        const userFrom = await Users.findOne({ where: {id: message.from}})
        if(!userFrom) return res.status(409).json({error: `User with id=${message.from} doesn't exists`})

        const userTo = await Users.findOne({ where: {id: message.to}})
        if(!userTo) return res.status(409).json({error: `User with id=${message.to} doesn't exists`})

        const { error } = schema.validate(message);
        if(error) return res.status(409).json(error);

        message["sent_time"] = new Date()

        createdMessage = await Messages.create(message)

        return res.json({"success" : createdMessage})
    })


router.route('/:id')
    .get(async (req, res) => {
        if (!req?.params?.id) return res.status(400).json({ "message": 'Message ID required' });
        const message = await Messages.findOne({where:{ id: req.params.id }});
        if (!message) return res.status(204).json({ 'message': `Post ID ${req.params.id} not found` });
        res.json(message); 
    })
    .delete(async (req, res) => {
        if (!req?.params?.id) return res.status(400).json({ "message": 'Message ID required' });
        const message = await Messages.findOne({ where: { id: req.params.id }});
        if (!message) return res.status(204).json({ 'message': `Message ID ${req.body.id} not found` }); 
        const result = await message.destroy()
        res.json(result);
    })
    .put(async (req, res) => {

        var messageForUser = {}

        if (!req?.params?.id) return res.status(400).json({ "message": 'Message ID required' });
        const message = await Messages.findOne({where: {id: req.params.id}})
        if (!message) return res.status(204).json({ 'message': `Message ID ${req.body.id} not found` }); 

        var messageContent = ''
        if(req.body.message)
        messageContent = req.body.message

        if(messageContent != '')
            message.message = messageContent
        
        await message.save()
        return res.json(message)
    })

const schema = Joi.object({
    to: Joi.number(),
    from: Joi.number(),
    message: Joi.string()
        .max(200)

})

module.exports = router