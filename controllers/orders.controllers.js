const Order = require('../models/order.model')

const getOrders = async (req, res) => {
    try {
        const orders = await Order.find({
            'user.userId': req.user._id,
        }).populate('user.userId')

        res.render('orders', {
            isOrder: true,
            title: 'MyStore | Мои заказы',
            orders: orders.map(o => {
                return {
                    ...o._doc,
                    price: o.products.reduce((total, c) => {
                        return (total += c.count * c.product.price)
                    }, 0),
                }
            }),
        })
    } catch (e) {
        console.log(e)
    }
}

const postOrders = async (req, res) => {
    try {
        const user = await req.user
            .populate('cart.items.productId')
            .execPopulate()

        const products = user.cart.items.map(i => ({
            count: i.count,
            product: { ...i.productId._doc },
        }))

        const order = new Order({
            user: {
                name: req.user.name,
                userId: req.user,
            },
            products: products,
        })

        await order.save()
        await req.user.clearCart()

        res.redirect('/orders')
    } catch (e) {
        console.log(e)
    }
}

module.exports = { getOrders, postOrders }
