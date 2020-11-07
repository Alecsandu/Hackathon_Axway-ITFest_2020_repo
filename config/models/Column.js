const mongoose = require('mongoose')

const ColumnSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    cards: [{ type: mongoose.Types.ObjectId, ref: 'Card'}]
})

module.exports = User = mongoose.model('Column', ColumnSchema)