const mongoose = require('mongoose')

const ProjectSchema = new mongoose.Schema({
    name: String,
    team: [{ type: mongoose.Types.ObjectId, ref:'user'}],
    columns: [{ type: mongoose.Types.ObjectId, ref: 'Column'}]
})

module.exports = Project = mongoose.model('Project', ProjectSchema)