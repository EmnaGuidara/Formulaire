const mongoose = require('mongoose');

const User = mongoose.model('User' ,{
    name:{
        type:String
    },
    lastname:{
        type: String
    },
    service: {
        type: String
    },
    
    email:{
        type :String
    },
    msg:{
        type:String
    }

})
module.exports = User ;