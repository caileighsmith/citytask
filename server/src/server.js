//Package imports
const express = require('express');
const bodyParser = require('body-parser')

//Local imports
const {sequelize, User, Task} = require('./database');

//Assignments
const app = express();
const port = 3000;

//Syncing sequelize on start && using middlewear to allow bodyparsing.
sequelize.sync();
app.use(bodyParser.json())

//Allowing CROSS access.
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

//Add new user
app.post('/user', async(req, res)=>{
    if (req.body.username && req.body.password){
        var user = await User.create({
            username: req.body.username,
            password: req.body.password,
            admin: false
        })}
    res.send({
        message: user ? 'User created successfully.' : 'User not created.'
    })
})

//Get all users
app.get('/users', async(req, res)=>{
    res.send({
        users: await User.findAll()
    })
})

//Find user based on username param (/user/username)
app.get('/user/:username', async(req, res)=>{
    console.log(req.params.username)
    res.send({
        user: req.params.username ? await User.findAll({where: {username: req.params.username}}) : `No user found.`
    })
})



app.listen(port, ()=>{
    console.log(`Server started on port ${port}. Ctrl + C to terminate.`);
})