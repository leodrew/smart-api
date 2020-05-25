const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const app =express();
const register = require('./control/register')
const signin = require('./control/signin')
const profile = require('./control/profile')
const image = require('./control/image')

const db = require('knex')({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : '0515',
    database : 'faceapp'
  }
});
console.log(db.select('*').from('users'));


app.use(bodyParser.json());
app.use(cors());



app.get('/',(req,res)=>{ res.send('it is working') })


app.post('/signin',(req,res)=>{signin.handlesignin(req,res,db,bcrypt)})
app.post('/register',(req,res)=>{register.handleregister(req,res,db,bcrypt)});
app.get('/profile/:id',(req,res)=>{profile.handleprofile(req,res,db)})
app.put('/image',(req,res)=>{image.handleimage(req,res,db)})
app.post('/imageurl',(req,res)=>{image.handleapi(req,res)})

app.listen(process.env.PORT || 3000,()=>{
	console.log(`app is runnung on port ${process.env.PORT}`)
})