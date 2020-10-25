const mongoose = require('mongoose')

const TaskSchema = mongoose.Schema({
    entity_id: {
        type: String,
        unique: true
    },
    dashboard_id: String,
    column_id: String,
    name: String
})

module.exports = mongoose.model('Task', TaskSchema)
