const{sequelize} = require('./models')

const express = require('express')
const app = express()

const path = require('path')

const credentials = require('./middleware/credentials')
const cors = require('cors')
const corsOptions = require('./config/corsOptions')

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials)

//Cross origin resource sharing
app.use(cors(corsOptions))

//Middleware to handle urlencoded form data
app.use(express.urlencoded({extended: true}))

//Middleware for json
app.use(express.json())

//Clear browser cache to prevent user from going back to pages after logging out
app.use(function(req, res, next) {
    res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
    next();
});

//Serve static files
app.use('/', express.static(path.join(__dirname, 'static')))

//Routes
app.use('/register', require('./service-auth/routes/register'))
app.use('/login', require('./service-auth/routes/login'))

app.all('*', (req, res) => {
    res.status(404)
    if(req.accepts('html')){
        res.sendFile(path.join(__dirname, 'static/html', '404.html'))
    }else if(req.accepts('json')){
        res.json({"error": "404 Not Found"})
    }else{
        res.type('txt').send("404 Not Found")
    }
})

app.listen({port: 8001, url: 'http://localhost'}, async () => {
    await sequelize.authenticate()
})