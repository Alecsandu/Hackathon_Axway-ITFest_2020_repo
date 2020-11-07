const mongoose = require('mongoose')

const CardSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    }
})

module.exports = Card = mongoose.model('Card', CardSchema)
