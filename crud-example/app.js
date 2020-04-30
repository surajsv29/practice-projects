const sql = require('mysql2')
const express = require('express')
const parser = require('body-parser')
const sls = require('serverless-http')
const app = express()

app.use(parser.json())

app.listen(3000,(err)=>{
    if(!err)
    console.log('Server Running')
    else
    console.log('Server Not Running')
})

const connection = sql.createConnection({
    host: 'ch-buyogo-rds-ch-dev1-rdscluster-1dmi9tf2dmuce.cluster-ctgjyfgcje6u.eu-central-1.rds.amazonaws.com',
    user: 'masteruser',
    password : '1XwStHpav01mVUeWnoYqC469SeIlMWxAuQ2',
    database: 'buyogo'
})

connection.connect((err)=>{
    if(!err)
    console.log('DB Connected')
    else
    console.log('DB Not Connected')
})

//Get All Users
app.get('/getAllUsers',async(req,res)=>{
    connection.query('select * from demoUser',(err, result,field)=>{
        if(!err)
        console.log(result)
        res.send({
            error : 'false',
            data : result,
            message : 'Data Found'
        })
    })
})

//Get User By ID
app.get('/getUserById/:id',(req,res)=>{
    connection.query('Select * from demoUser where id = ?',[req.params.id],(err, result,field)=>{
        if(!err)
        console.log(result)
        res.send({
            error : 'false',
            data : result,
            message : 'Data Found'
        })
    })
})

//Delete Users By Id
app.get('/deleteUserById/:id',(req,res)=>{
    connection.query('Delete from demoUser where id = ?',[req.params.id],(err, result,field)=>{
        if(!err)
        console.log(result)
        res.send({
            error : 'false',
            data : result,
            message : 'Data Found'
        })
    })
})

//Add User
app.post('/addUser',(req,res)=>{
    connection.query('insert into demoUser values (?,?,?)',[req.body.id,req.body.fName,req.body.lName],(err, result,field)=>{
        if(!err)
        console.log(result)
        res.send({
            error : 'false',
            data : result,
            message : 'Data Found'
        })
    })
})

module.exports.server = sls(app)