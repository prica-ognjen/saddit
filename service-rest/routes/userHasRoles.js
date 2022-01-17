const express = require('express')
const router = express.Router()
const Joi = require('joi')
const {sequelize, Users, Roles, UserHasRoles} = require('../../models');
const { QueryTypes } = require('sequelize');
const ROLES_LIST = require('../../config/rolesList')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

router.route('/')
    .get(async (req, res) => {
        return res.json(await UserHasRoles.findAll())
    })
    .post(async (req, res) => {
        const obj = {
            user_id: req.body.user_id,
            role_id: req.body.role_id,
        }

        const userHasRoles = await UserHasRoles.findOne({ where: {user_id: obj.user_id, role_id: obj.role_id}})
        if(userHasRoles) return res.status(409).json({error: `User ${obj.user_id} already has role ${obj.role_id}`})

        const { error } = schema.validate(obj);
        if(error) return res.status(409).json(error);

        createdUserHasRole = await UserHasRoles.create(obj)

        return res.json({"success" : createdUserHasRole})
    })
    .delete(async (req, res) => {
        if (!req?.body?.user_id || !req?.body?.role_id) return res.status(400).json({ "message": 'User and Role ID required' });
        const userHasRole = await UserHasRoles.findOne({ where: {user_id: req.body.user_id, role_id: req.body.role_id}});
        if (!userHasRole) return res.status(204).json({ 'message': `User ${req.body.user_id} doesnt have role ${req.body.role_id}` }); 
        const result = await userHasRole.destroy()
        return res.json(result)
    })


router.route('/:id')
    .get(async (req, res) => {
        if (!req?.params?.id) return res.status(400).json({ "message": 'UserHasRole ID required' });
        const userHasRole = await UserHasRoles.findOne({where:{ id: req.params.id }});
        if (!userHasRole) return res.status(204).json({ 'message': `Post ID ${req.params.id} not found` });
        res.json(userHasRole); 
    })
    .delete(async (req, res) => {
        if (!req?.body?.user_id || !req?.body?.role_id) return res.status(400).json({ "message": 'User and Role ID required' });
        const userHasRole = await UserHasRoles.findOne({ where: {user_id: obj.user_id, role_id: obj.role_id}});
        if (!userHasRole) return res.status(204).json({ 'message': `User ${req.body.user_id} doesnt have role ${req.body.role_id}` }); 
        const result = await userHasRole.destroy()
        return res.json(result)
    })
    .put(async (req, res) => {
        if (!req?.params?.id) return res.status(400).json({ "message": 'User ID required' });
        const userHasRole = await UserHasRoles.findOne({ where: {user_id: req.params.id}})
        if (!userHasRole) return res.status(500).json({ 'message': `User has no roles, unknown error` }); 
        const validRole = await Roles.findOne({where: {id: req.body.role_id2}})
        if(!validRole && req.body.role_id2 != "") return res.status(204).json({ 'message': `Role with id ${req.body.role_id2} doesn't exist`}); 

        var roleChange = ''
        if(req.body.role_id2)
            roleChange = req.body.role_id2

        const userId = userHasRole.user_id

        await clearRolesFromUser(userId)
            
        if(roleChange != ''){
            const maxRole = parseInt(roleChange)

            var niz = []
            let k = 0

            for(let i = maxRole; i <= Object.keys(ROLES_LIST).length; i++){
                niz[k++] = await addUserRole(userId, i)
            }
            return res.json(niz)
        
        }else{
            return res.json(await addUserRole(userId, ROLES_LIST.ROLE_USER))
        }
        
    })

async function addUserRole(userId, roleId){
    await UserHasRoles.create({
        user_id: userId,
        role_id: roleId
    })
}

async function clearRolesFromUser(userId){
    await sequelize.query(`DELETE FROM sadditdb.userhasroles WHERE (user_id = ${userId});`)
}

const schema = Joi.object({
    user_id: Joi.number(),
    role_id: Joi.number(),
})

module.exports = router