const { Schema, model } = require('mongoose')

const userSchema = new Schema({
    admin: {
        type: Boolean,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    resetToken: String,
    resetTokenExp: Date,
})

module.exports = model('User', userSchema)
