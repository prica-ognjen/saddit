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
        return res.json(await Users.findAll())
    })
    .post(async (req, res) => {
        const user = {
            email: req.body.email,
            password: req.body.password,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            birth_date: req.body.birth_date,
            country: req.body.country,
            enabled: true
        }
        const { error } = schema.validate(user);
        if(error) return res.status(409).json(error);

        const duplicate = await Users.findOne({ where: {email: user.email}})
        if(duplicate) return res.status(409).json({error: "User with this email already exists"})

        const hp = bcrypt.hashSync(user.password, 10)
        user.password = hp

        const createdUser =  await Users.create(user).then(res => {
            createUserRole(res.id)
        })
        return res.json({"success" : createdUser})
    })


router.route('/:id')
    .get(async (req, res) => {
        if (!req?.params?.id) return res.status(400).json({ "message": 'User ID required' });
        const user = await Users.findOne({where:{ id: req.params.id }});
        if (!user) return res.status(204).json({ 'message': `User ID ${req.params.id} not found` });
        res.json(user); 
    })
    .delete(async (req, res) => {
        if (!req?.params?.id) return res.status(400).json({ "message": 'User ID required' });
        const user = await Users.findOne({ where: { id: req.params.id }});
        if (!user) return res.status(204).json({ 'message': `User ID ${req.body.id} not found` }); 
        const result = await user.destroy()
        res.json(result);
    })
    .put(async (req, res) => {

        var message = {}

        if (!req?.params?.id) return res.status(400).json({ "message": 'User ID required' });
        const user = await Users.findOne({where: {id: req.params.id}})
        if (!user) return res.status(204).json({ 'message': `User ID ${req.body.id} not found` }); 

        var enabled = ''
        if(req.body.enabled)
            enabled = req.body.enabled.replace(/ /g, '');

        if(enabled !== 'yes' && enabled !== 'Yes' && enabled !== 'no' && enabled !== 'No' && enabled != ""){
            message[0] = {enabled: "Invalid value entered for property"}
        }else{
            if(enabled === 'yes' || enabled === 'Yes'){
                enabled = false
            }else{
                enabled = true
            }
        }

        var cleanRoles = ''
        var rolesArray = []

        if(req.body.roles){
            cleanRoles = req.body.roles.replace(/ /g, '')
            rolesArray = cleanRoles.split(",")
        }
        
        var rolesInSystem = []
        for (var key in ROLES_LIST) {
            if (ROLES_LIST.hasOwnProperty(key)) {
                rolesInSystem.push(ROLES_LIST[key])
            }
        }

        rolesArray.forEach(element => {
            if(!rolesInSystem.includes(element)){
                message[1] = {roles: "Invalid value entered for property"}
            }

        });

        var admin = false

        await clearRolesFromUser(user.id)
        user.enabled = enabled
        for(let i = 0; i < rolesArray.length; i++){
            if(rolesArray[i] == ROLES_LIST.ROLE_ADMIN){
                admin = true
                break;
            }
            addUserRole(user.id, rolesArray[i])
        }

        if(admin){
            rolesInSystem.forEach(element => {
                addUserRole(user.id, element)
            })    
        }
        
        await user.save()
        return res.json(user)
    })

const schema = Joi.object({
    email: Joi.string()
        .email({minDomainSegments: 2})
        .required(),
    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .required(),
    first_name: Joi.string()
        .min(2)
        .max(20)
        .required(),
    last_name: Joi.string()
    .min(2)
    .max(20)
    .required(),
    birth_date: Joi.date(),
    country: Joi.string()
        .min(4)
        .max(56),
    enabled: Joi.boolean()
    .messages({
        'string.base': `"a" should be a type of 'text'`,
        'string.empty': `"a" cannot be an empty field`,
        'string.min': `"a" should have a minimum length of {#limit}`,
        'any.required': `"a" is a required field`
      })
})

async function createUserRole(id){
    var role = await Roles.findOne({ where: {id: ROLES_LIST.ROLE_USER}})
    await UserHasRoles.create({
        user_id: id,
        role_id: role.id
    })
}

async function clearRolesFromUser(userId){
    await sequelize.query(`DELETE FROM sadditdb.userhasroles WHERE (user_id = ${userId});`)
}

async function addUserRole(userId, roleId){
    await UserHasRoles.create({
        user_id: userId,
        role_id: roleId
    })
}

module.exports = router