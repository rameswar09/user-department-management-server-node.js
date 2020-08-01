const mongoose = require('mongoose')

const User = mongoose.model('Notifications', {
    id: String,
    assigned_to: String,
    created_by: String,
    department: String,
    assigned_user_name:String,
    time: { type: Date, default: Date.now },
    status: Boolean,
    active: Boolean,
    created_by_name:String,
    dept_name:String,
    approved: Boolean,
    created_by_name:String,
    msg: String
})

module.exports = User
