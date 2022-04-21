module.exports = function computePrice(products) {
    return products.reduce((total, product) => {
        return (total += product.price * product.count)
    }, 0)
}
