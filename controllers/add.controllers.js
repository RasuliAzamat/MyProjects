const Product = require('../models/product.model')
const { validationResult } = require('express-validator')

const getAdd = (req, res) => {
    res.render('add', {
        title: 'MyStore | Добавить товар',
        isAdd: true,
    })
}

const postAdd = async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(422).render('add', {
            title: 'MyStore | Добавить товар',
            isAdd: true,
            error: errors.array()[0].msg,
            values: {
                title: req.body.title,
                price: req.body.price,
                img: req.body.img,
            },
        })
    }

    const product = new Product({
        title: req.body.title,
        price: req.body.price,
        img: req.body.img,
        userId: req.user,
    })

    try {
        await product.save()
        res.redirect('/products')
    } catch (e) {
        console.log(e)
    }
}

module.exports = { getAdd, postAdd }
