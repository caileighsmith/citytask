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
    query = await User.findAll({where: {username : req.params.username}}) 
    res.send({
        user: query.length != 0? await User.findAll({where: {username: req.params.username}}) : `No user found.`
    })
})

//Create a task
app.post('/task', async(req, res)=>{
    if (req.body){
        var task = Task.create({
            title: req.body.title,
            description: req.body.description,
            value: req.body.value,
            comission: req.body.comission,
            taken: req.body.taken,
            assignedUser: req.body.assignedUser
        })}
    res.send({
        message: task? `Task created successfuly` : `Task failed to create. Please try again..`
    })
})

//View all tasks
app.get('/tasks', async(req, res)=>{
    res.send({
        tasks: await Task.findAll()
    })
})

//Find task via ID param
app.get('/task/:id', async(req, res)=>{
    query = await Task.findAll({where: {id : req.params.id}}) 
    res.send({
        task: query.length != 0 ? await Task.findAll({where: {id : req.params.id}}) : `No task with id ${req.params.id} found.`
    })
})


app.listen(port, ()=>{
    console.log(`Server started on port ${port}. Ctrl + C to terminate.`);
})