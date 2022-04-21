module.exports = function mapCartItems(cart) {
    return cart?.items?.map(c => ({
        ...c.productId._doc,
        id: c.productId.id,
        count: c.count,
    }))
}
