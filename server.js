const express = require('express'); //import
const { mongo } = require('./config/conncet');
const { default: mongoose } = require('mongoose');
const user =require('./Routes/user')
require('./config/conncet')

const app= express(); // creation d'une application qui utilise exprress js
app.use(express.json());
app.use('/user',user)
app.listen(3001,()=>{
    console.log('server working')
}) // le serveur reste en ecoute