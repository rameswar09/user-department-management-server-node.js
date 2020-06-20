const mongoose = require('mongoose')

const User = mongoose.model('User', {
    code: String,
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    department: String,
    disabled: Boolean,
    time: { type: Date, default: Date.now }
})

module.exports = User
