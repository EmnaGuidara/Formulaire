const mongoose = require('mongoose')

const Formulaire = mongoose.model('Formulaire', {
    submitted_date: {
        type: Date, default: Date.now
    },

    content: {
        type: String, required: true
    },

    Client_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client',
        required: true
    }
}

)
module.exports = Formulaire