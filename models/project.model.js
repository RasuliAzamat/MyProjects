const { Schema, model } = require('mongoose')

const projectSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: Number,
        required: true,
    },
    img: {
        type: String,
        required: true,
    },
    sorce: {
        type: String,
        required: true,
    },
    tags: {
        type: String,
        required: false,
    },
})

module.exports = model('Project', projectSchema)
