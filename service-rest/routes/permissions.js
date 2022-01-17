const express = require('express')
const router = express.Router()
const Joi = require('joi')
const {sequelize, Users, Permissions} = require('../../models');
const { QueryTypes } = require('sequelize');
const ROLES_LIST = require('../../config/rolesList')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

router.route('/')
    .get(async (req, res) => {
        return res.json(await Permissions.findAll())
    })
    .post(async (req, res) => {

        const obj = {
            name: req.body.name,
            description: req.body.description,
        }

        const permission = await Permissions.findOne({ where: {id: obj.name}})
        if(permission) return res.status(409).json({error: `Permission with name=${permission.name} already exists`})

        const { error } = schema.validate(obj);
        if(error) return res.status(409).json(error);

        createdPermission = await Permissions.create(obj)

        return res.json({"success" : createdPermission})
    })


router.route('/:id')
    .get(async (req, res) => {
        if (!req?.params?.id) return res.status(400).json({ "permission": 'Permission ID required' });
        const permission = await Permissions.findOne({where:{ id: req.params.id }});
        if (!permission) return res.status(204).json({ 'permission': `Post ID ${req.params.id} not found` });
        res.json(permission); 
    })
    .delete(async (req, res) => {
        if (!req?.params?.id) return res.status(400).json({ "permission": 'Permission ID required' });
        const permission = await Permissions.findOne({ where: { id: req.params.id }});
        if (!permission) return res.status(204).json({ 'permission': `Permission ID ${req.body.id} not found` }); 
        const result = await permission.destroy()
        res.json(result);
    })
    .put(async (req, res) => {

        var message = {}

        if (!req?.params?.id) return res.status(400).json({ "permission": 'Permission ID required' });
        const permission = await Permissions.findOne({where: {id: req.params.id}})
        if (!permission) return res.status(204).json({ 'permission': `Permission ID ${req.body.id} not found` }); 

        var permissionName = ''
        if(req.body.name)
            permissionName = req.body.name

        var permissionDesc = ''
        if(req.body.description)
            permissionDesc = req.body.description
        
        if(permissionName != '')
            permission.name = permissionName

        if(permissionDesc != '')
             permission.permission = permissionDesc

        await permission.save()
        return res.json(permission)
    })

const schema = Joi.object({
    name: Joi.string()
        .max(50),
    description: Joi.string()
        .max(100)

})

module.exports = router