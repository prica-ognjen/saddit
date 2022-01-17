const express = require('express')
const router = express.Router()
const Joi = require('joi')
const {sequelize, Users, Posts, RoleHasPermissions} = require('../../models');
const { QueryTypes } = require('sequelize');
const ROLES_LIST = require('../../config/rolesList')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

router.route('/')
    .get(async (req, res) => {
        return res.json(await RoleHasPermissions.findAll())
    })
    .post(async (req, res) => {
        const obj = {
            role_id: req.body.role_id,
            permission_id: req.body.permission_id,
        }

        const roleHasPermissions = await RoleHasPermissions.findOne({ where: {role_id: obj.role_id, permission_id: obj.permission_id}})
        if(roleHasPermissions) return res.status(409).json({error: `Role ${obj.role_id} already has permission ${obj.permission_id}`})

        const { error } = schema.validate(obj);
        if(error) return res.status(409).json(error);

        createdRoleHasPermission = await RoleHasPermissions.create(obj)

        return res.json({"success" : createdRoleHasPermission})
    })
    .delete(async (req, res) => {
        if (!req?.body?.role_id || !req?.body?.permission_id) return res.status(400).json({ "message": 'Role and Permission ID required' });
        const roleHasPermission = await RoleHasPermissions.findOne({ where: {role_id: req.body.role_id, permission_id: req.body.permission_id}});
        if (!roleHasPermission) return res.status(204).json({ 'message': `No role with permission ${req.body.permission_id} found` }); 
        const result = await roleHasPermission.destroy()
        res.json(result);
    })


router.route('/:id')
    .get(async (req, res) => {
        if (!req?.params?.id) return res.status(400).json({ "message": 'RoleHasPermission ID required' });
        const roleHasPermission = await RoleHasPermissions.findOne({where:{ id: req.params.id }});
        if (!roleHasPermission) return res.status(204).json({ 'message': `Post ID ${req.params.id} not found` });
        res.json(roleHasPermission); 
    })
    .delete(async (req, res) => {
        if (!req?.body?.role_id || !req?.body?.permission_id) return res.status(400).json({ "message": 'Role and Permission ID required' });
        const roleHasPermission = await RoleHasPermissions.findOne({ where: {role_id: req.body.role_id, permission_id: req.body.permission_id}});
        if (!roleHasPermission) return res.status(204).json({ 'message': `No role with permission ${req.body.permission_id} found` }); 
        const result = await roleHasPermission.destroy()
        res.json(result);
    })
    .put(async (req, res) => {

        var message = {}

        if (!req?.params?.id) return res.status(400).json({ "message": 'Role ID required' });
        const roleHasPermission = await RoleHasPermissions.findOne({ where: {role_id: req.params.id, permission_id: req.body.permission_id1}})
        if (!roleHasPermission) return res.status(204).json({ 'message': `No role with permission ${req.body.permission_id1} found` }); 

        var permissionChange = ''
        if(req.body.permission_id2)
            permissionChange = req.body.permission_id2

        if(permissionChange != ''){
            const roleId = roleHasPermission.role_id
            await roleHasPermission.destroy()
        
            return res.json(await RoleHasPermissions.create({
                role_id: roleId,
                permission_id: permissionChange
            }))
        }
        else
            return res.json(await roleHasPermission.destroy())
    })

const schema = Joi.object({
    role_id: Joi.number(),
    permission_id: Joi.number(),
})

module.exports = router