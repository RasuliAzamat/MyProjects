const { Schema, model } = require('mongoose')

const productschema = new Schema({
    title: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    img: String,
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
})

productschema.method('toClient', function () {
    const product = this.toObject()

    product.id = product._id
    delete product._id

    return product
})

module.exports = model('Product', productschema)
