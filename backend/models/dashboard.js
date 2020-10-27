const mongoose = require('mongoose')

const dashboardSchema = mongoose.Schema({
    entity_id: {
        type: String,
        unique: true
    },
    user_id: String,
    name: String
})

module.exports = mongoose.model('Dashboard', dashboardSchema)
