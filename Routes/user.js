const express = require('express')

const router = express.Router()

const User = require('../Models/user')


//post : ajouter


router.post('/add',  async (req, rep) => {
    try {
        let data = req.body;
        let user = new User(data)
        
        savedUser = await user.save();
        rep.send(savedUser)
        console.log(savedUser)
    } catch (error) {
        rep.send(error)
    }
})

router.get('/getAll', async (req, rep) => {
    try {
        users = await User.find();
        console.log(users)
        rep.send(users)
    } catch (error) {
        rep.send(error)
    }
})

router.get('/getByEmail/:Email', async (req, rep) => {
    try {
        email = req.params.email
        users = await User.find({ email: email });
        console.log(users)
        rep.send(users)

    } catch (err) {
        rep.send(err)
    }
}) 
router.delete('/deleteByEmail/:email', async (req, rep) => {
    try {
        email = req.params.email
        delUser = await User.findOneAndDelete({ email :email })
        rep.send(delUser)
    } catch (error) {
        rep.send(error)
    }
})
router.put('/update/:email', async (req, rep) => {
    try {
        email= req.params.email
        data = req.body
        user = await User.findOneAndUpdate({email :email }, data)
        rep.send(user)
    } catch (error) {
        rep.send(error)

    }
})

module.exports = router