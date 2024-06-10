const express = require('express'); //import
require('dotenv').config();

const user = require('./Routes/user')
require('./config/conncet')

const app = express(); // creation d'une application qui utilise exprress js
app.use(express.json());
app.use('/user', user)
app.listen(3001, () => {
    console.log('server working')
}) // le serveur reste en ecoute