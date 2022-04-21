const Product = require('../models/product.model')
const mapCartItems = require('../helpers/mapCartItems')
const computePrice = require('../helpers/computePrice')

const postAdd = async (req, res) => {
    const product = await Product.findById(req.body.id)
    await req.user.addToCart(product)
    res.redirect('/cart')
}

const deleteById = async (req, res) => {
    await req.user.removeFromCart(req.params.id)
    const user = await req.user.populate('cart.items.productId').execPopulate()
    const products = mapCartItems(user.cart)
    const cart = {
        products,
        price: computePrice(products),
    }
    res.status(200).json(cart)
}

const getCart = async (req, res) => {
    const user = await req.user.populate('cart.items.productId').execPopulate()

    const products = mapCartItems(user.cart)

    res.render('cart', {
        title: 'MyStore | Корзина товаров',
        isCart: true,
        products: products,
        price: computePrice(products),
    })
}

module.exports = { getCart, postAdd, deleteById }