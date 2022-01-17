const express = require('express')
const router = express.Router()
const Joi = require('joi')
const {sequelize} = require('../../models');
const { QueryTypes } = require('sequelize');
const ROLES_LIST = require('../../config/rolesList')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const authorize = require('../../middleware/authorize');
require('dotenv').config()

router.route('/')
    .get(async (req, res) => {
        return res.json(await getTables())
    })

router.use('/users', authorize.verifyRoles(ROLES_LIST.ROLE_ADMIN), require('../routes/users.js'))
router.use('/posts', require('../routes/posts.js'))
router.use('/comments', require('../routes/comments.js'))
router.use('/messages', require('../routes/messages.js'))
router.use('/roles', require('../routes/roles.js'))
router.use('/permissions', require('../routes/permissions.js'))
router.use('/rolehaspermissions', require('../routes/roleHasPermissions'))
router.use('/userhasroles', require('../routes/userhasroles'))

async function getTables(){
    return await sequelize.query(`
    SELECT table_name FROM information_schema.tables
    WHERE table_schema = 'sadditdb';`, 
        { type: QueryTypes.SELECT }).then(res => {
            const array = res.map(function(obj){
                return obj.TABLE_NAME
            })
            return array
        })
}

module.exports = router