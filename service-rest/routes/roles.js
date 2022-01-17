const express = require('express')
const router = express.Router()
const Joi = require('joi')
const {sequelize, Users, Roles} = require('../../models');
const { QueryTypes } = require('sequelize');
const ROLES_LIST = require('../../config/rolesList')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const rolesList = require('../../config/rolesListAsync')

router.route('/')
    .get(async (req, res) => {
        return res.json(await Roles.findAll())
    })
    .post(async (req, res) => {

        const obj = {
            name: req.body.name,
            description: req.body.description,
        }

        const role = await Roles.findOne({ where: {id: obj.name}})
        if(role) return res.status(409).json({error: `Role with name=${role.name} already exists`})

        const { error } = schema.validate(obj);
        if(error) return res.status(409).json(error);

        createdRole = await Roles.create(obj)

        return res.json({"success" : createdRole})
    })


router.route('/:id')
    .get(async (req, res) => {
        if (!req?.params?.id) return res.status(400).json({ "role": 'Role ID required' });
        const role = await Roles.findOne({where:{ id: req.params.id }});
        if (!role) return res.status(204).json({ 'role': `Post ID ${req.params.id} not found` });
        res.json(role); 
    })
    .delete(async (req, res) => {
        if (!req?.params?.id) return res.status(400).json({ "role": 'Role ID required' });
        const role = await Roles.findOne({ where: { id: req.params.id }});
        if (!role) return res.status(204).json({ 'role': `Role ID ${req.body.id} not found` }); 
        const result = await role.destroy()
        res.json(result);
    })
    .put(async (req, res) => {

        var message = {}

        if (!req?.params?.id) return res.status(400).json({ "role": 'Role ID required' });
        const role = await Roles.findOne({where: {id: req.params.id}})
        if (!role) return res.status(204).json({ 'role': `Role ID ${req.body.id} not found` }); 

        var roleName = ''
        if(req.body.name)
            roleName = req.body.name

        var roleDesc = ''
        if(req.body.description)
            roleDesc = req.body.description
        
        if(roleName != '')
            role.name = roleName

        if(roleDesc != '')
             role.description = roleDesc

        await role.save()
        return res.json(role)
    })

const schema = Joi.object({
    name: Joi.string()
        .max(50),
    description: Joi.string()
        .max(100)

})

module.exports = router