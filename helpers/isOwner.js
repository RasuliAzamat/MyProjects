module.exports = function isOwner(product, req) {
    return product.userId.toString() === req.user._id.toString()
}