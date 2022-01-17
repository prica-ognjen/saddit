const express = require('express')
const router = express.Router()
const Joi = require('joi')
const {sequelize, Users, UserHasRoles, Roles} = require('../../models');
const { QueryTypes } = require('sequelize');
const ROLES_LIST = require('../../config/rolesList')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()


router.route('/')
    .post(async (req, res) => {

        const user = {
            email: req.body.email,
            password: req.body.password
        }

        //Joi validation
        const { error } = schema.validate(user);
        if(error) return res.status(409).json(error);

        //Authenticates whether user exists in database with
        //entered credentials
        const foundUser = await Users.findOne({ where: {email: user.email}})
        if(!foundUser) return res.status(401).json({error: "Wrong email or password"})
        const match = await bcrypt.compare(user.password, foundUser.password)
        if(!match) return res.status(401).json({error: "Wrong email or password"})

        //Getting all roles for user
        const roles = await getRoles(foundUser)

        //Generating accessToken
        const accessToken = jwt.sign(
            {
                "UserInfo" : {
                    "id": foundUser.id,
                    "roles": roles
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: '240s'} //4min for testing
        )

        //Sending generated jwt in the response
        return res.json({jwt: accessToken})
    })

const schema = Joi.object({
    email: Joi.string()
        .email({minDomainSegments: 2})
        .required(),
    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .required()
})

async function getRoles(user){
    return await sequelize.query(` \
        SELECT r.id FROM sadditdb.roles r \
        JOIN sadditdb.userhasroles uhr ON r.id=uhr.role_id \
        WHERE uhr.user_id=${user.id}`, 
        { type: QueryTypes.SELECT }).then(res => {
            const array = res.map(function(obj){
                return obj.id
            })
            return array
        })
}

module.exports = router