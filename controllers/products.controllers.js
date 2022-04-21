const Product = require('../models/product.model')
const { validationResult } = require('express-validator')
const isOwner = require('../helpers/isOwner')

const getProducts = async (req, res) => {
    try {
        const products = await Product.find()
            .populate('userId', 'email name')
            .select('price title img')

        res.render('products', {
            title: 'MyStore | Все товары',
            isProducts: true,
            userId: req.user ? req.user._id.toString() : null,
            products,
        })
    } catch (error) {
        console.log(error)
    }
}

const getEdit = async (req, res) => {
    if (!req.query.allow) {
        return res.redirect('/')
    }

    try {
        const product = await Product.findById(req.params.id)

        if (!isOwner(product, req)) {
            return res.redirect('/products')
        }

        res.render('product-edit', {
            title: `MyStore | Редактировать ${product.title}`,
            product,
        })
    } catch (error) {
        console.log(error)
    }
}

const postEdit = async (req, res) => {
    const { id } = req.body
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(422).redirect(`/products/${id}/edit?allow=true`)
    }
    try {
        delete req.body.id
        const product = await Product.findById(id)
        if (!isOwner(product, req)) {
            return res.redirect('/products')
        }
        Object.assign(product, req.body)
        await product.save()
        res.redirect('/products')
    } catch (error) {
        console.log(error)
    }
}

const postRemove = async (req, res) => {
    try {
        await Product.deleteOne({
            _id: req.body.id,
            userId: req.user._id,
        })
        res.redirect('/products')
    } catch (e) {
        console.log(e)
    }
}

const getId = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        res.render('product', {
            layout: 'empty',
            title: `MyStore | Товар ${product.title}`,
            product,
        })
    } catch (error) {
        console.log(error)
    }
}

module.exports = { getProducts, getEdit, postEdit, postRemove, getId }
