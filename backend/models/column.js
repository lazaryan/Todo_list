const mongoose = require('mongoose')

const columnSchema = mongoose.Schema({
    entity_id: {
        type: String,
        unique: true
    },
    dashboard_id: String,
    name: String,
    show: Boolean
})

module.exports = mongoose.model('Column', columnSchema)
