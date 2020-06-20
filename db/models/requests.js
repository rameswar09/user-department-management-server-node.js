const mongoose = require('mongoose')

const User = mongoose.model('Notifications', {
    id: String,
    assigned_to: String,
    created_by: String,
    department: String,
    time: { type: Date, default: Date.now },
    status: Boolean,
    active: Boolean,
    approved: Boolean,
    msg: String
})

module.exports = User
