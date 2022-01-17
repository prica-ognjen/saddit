const express = require('express')
const router = express.Router()
const ROLES_LIST = require('../../config/rolesList')
const authorize = require('../../middleware/authorize')


router.use(authorize.verifyRoles(ROLES_LIST.ROLE_MODERATOR))

router.get('/', (req, res) => {
    res.sendFile('dashboard.html', {root: './static/html'});
})

router.get('/users', authorize.verifyRoles(ROLES_LIST.ROLE_ADMIN),(req, res) => {
    res.sendFile('usersTable.html', {root: './static/html'});
})

router.get('/posts', (req, res) => {
    res.sendFile('postsTable.html', {root: './static/html'});
})

router.get('/comments', (req, res) => {
    res.sendFile('commentsTable.html', {root: './static/html'});
})

router.get('/messages', (req, res) => {
    res.sendFile('messagesTable.html', {root: './static/html'});
})

router.get('/roles', (req, res) => {
    res.sendFile('rolesTable.html', {root: './static/html'});
})

router.get('/permissions', (req, res) => {
    res.sendFile('permissionsTable.html', {root: './static/html'});
})

router.get('/userhasroles', (req, res) => {
    res.sendFile('userhasrolesTable.html', {root: './static/html'});
})

router.get('/rolehaspermissions', (req, res) => {
    res.sendFile('roleHasPermissionsTable.html', {root: './static/html'});
})

module.exports = router