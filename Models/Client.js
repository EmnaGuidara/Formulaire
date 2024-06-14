const mongoose = require('mongoose')

const Client = mongoose.model('Client', {
    name: {
        type: String, required: true
    },
    referalUrl: {
        type: String, required: true
    },
    status: {
        type: String, required: true
    },
    privateKey: {
        type: String
    },
    lastPrivateKeyUpdated:{
        type:Date,default:Date.now
    },
    publicKey: {
        type: String
    },
    formulaires: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Formulaire' }]
},

)
module.exports = Client