const { Schema, model } = require('mongoose')

const projectSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        demo: {
            type: String,
            required: true,
        },
        source: {
            type: String,
            required: true,
        },
        tags: {
            type: String,
            required: false,
        },
    },
    { timestamps: true }
)

module.exports = model('Project', projectSchema)
