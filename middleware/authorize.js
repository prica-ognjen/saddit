const jwt = require('jsonwebtoken')
require('dotenv').config()

const verifyLoggedUser = (req, res, next) => {
    const cookies = getCookies(req)
    const accessToken = cookies['token']

    if (accessToken == "") return next();

    //if user is already logged in, he will be redirected to the first page
    jwt.verify(
        accessToken,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if(err) return next();
            return res.redirect(302, '/')
        }
    )
}

const verifyAuthHeader = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization
    if(!authHeader?.startsWith('Bearer ')) return res.redirect(302, '/login')
    const token = authHeader.split(" ")[1]

    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if(err) return res.redirect(302, '/login')
            req.user = decoded.UserInfo.id
            req.roles = decoded.UserInfo.roles
            next()
        }
    )
}

const verifyRoles = (...allowedRoles) => {
    return (req, res, next) => {
        
        //Does request exist, and if it exists, do roles exists
        if(!req?.roles) return res.sendStatus(401)

        const roles = [...allowedRoles]

        //Result value looks for the first true value in the mapped array
        const result = 
            req.roles.map(role => roles.includes(role))
            .find(val => val == true)

        //If result couldn't find a true value the user is unauthorized
        if(!result) return res.sendStatus(401)
        next()
    }
}

const verifyJWT = (req, res, next) => {

    const cookies = getCookies(req)
    const accessToken = cookies['token']

    if(accessToken == null) return res.redirect(302, '/login') //redirect/unauthorized

    jwt.verify(
        accessToken,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if(err) return res.redirect(302, '/login') //redirect/unauthorized
            
            //JWT decoded successfuly
            req.user = decoded.UserInfo.id
            req.roles = decoded.UserInfo.roles

            next()
        }
    )
}

function getCookies(req){
    if(req.headers.cookie == null) return {}
    const rawCookies = req.headers.cookie.split('; ')
    const parsedCookies = {}

    rawCookies.forEach(rawCookie => {
        const parsedCookie = rawCookie.split('=')
        parsedCookies[parsedCookie[0]] = parsedCookie[1]
    })

    return parsedCookies
}

module.exports = {
    verifyJWT: verifyJWT,
    verifyRoles: verifyRoles,
    verifyAuthHeader: verifyAuthHeader,
    verifyLoggedUser: verifyLoggedUser
}