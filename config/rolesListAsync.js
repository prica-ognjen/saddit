const { QueryTypes } = require('sequelize');
const {sequelize} = require('../models')


const rolesList = async () => {
    return await getRoles()
}

async function getRoles(){
    const roleNames = await sequelize.query('SELECT name, id FROM sadditdb.roles', { type: QueryTypes.SELECT })

    let i = 0

    var niz = {}

    roleNames.forEach(element => {
        niz[element.name] = element.id
    });

    return niz;
}

module.exports = rolesList;