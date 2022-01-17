const express = require('express')
const router = express.Router()
const Joi = require('joi')
const { QueryTypes } = require('sequelize');
const {sequelize, Users, UserHasRoles, Roles} = require('../../models');
const ROLES_LIST = require('../../config/rolesList')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

router.route('/')
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

        //Joi validation
        const { error } = schema.validate(user);
        if(error) return res.status(409).json(error);

        //Checks if user with email exists in the database
        const duplicate = await Users.findOne({ where: {email: user.email}})
        if(duplicate) return res.status(409).json({error: "User with this email already exists"})

        //Handles password hashing
        const hp = bcrypt.hashSync(user.password, 10)
        user.password = hp

        //Handles user creation
        //Creates entry in junction table UserHasRoles
        const createdUser = await Users.create(user).then(res1 => {
            createUserRole(res1.id)

            getRoles(res1.id).then(res2 => {

                const accessToken = jwt.sign(
                {
                    "UserInfo" : {
                        "id": res1.id,
                        "roles": res2
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn: '240s'} //4min for testing
                )

                //Sending generated jwt in the response
                return res.json({jwt: accessToken})

            }) 
        }) 
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
})

async function getRoles(id){
    return await sequelize.query(` \
        SELECT r.id FROM sadditdb.roles r \
        JOIN sadditdb.userhasroles uhr ON r.id=uhr.role_id \
        WHERE uhr.user_id=${id}`, 
        { type: QueryTypes.SELECT }).then(res => {
            const array = res.map(function(obj){
                return obj.id
            })
            return array
        })
}

async function createUserRole(id){
    var role = await Roles.findOne({ where: {id: ROLES_LIST.ROLE_USER}})
    await UserHasRoles.create({
        user_id: id,
        role_id: role.id
    })
}

module.exports = router