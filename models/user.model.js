const { Schema, model } = require('mongoose')

const userSchema = new Schema(
    {
        isAdmin: {
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
    },
    { timestamps: true }
)

module.exports = model('User', userSchema)
