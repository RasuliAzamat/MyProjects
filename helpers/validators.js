const { body } = require('express-validator')
const User = require('../models/user.model')

exports.registerValidators = [
    body('email')
        .isEmail()
        .withMessage('Введите корректный email!')
        .custom(async val => {
            try {
                const user = await User.findOne({ email: val })
                if (user) return Promise.reject('Такой email уже занят!')
            } catch (error) {
                console.log(error)
            }
        })
        .normalizeEmail(),

    body('password', 'Минимальное количество символов в пароле 6')
        .isLength({ min: 6 })
        .isAlphanumeric(),
    body('password', 'Размер пароля не должен превышать 42')
        .isLength({ max: 42 })
        .isAlphanumeric(),
    body('confirm').custom((val, { req }) => {
        if (val !== req.body.password) {
            throw new Error('Пароли должны совпадать!')
        }
        return true
    }),
    body('name', 'Минимальное количество символов в имени 3')
        .isLength({ min: 3 })
        .trim(),
    body('name', 'Размер имени не должен превышать 24')
        .isLength({ max: 24 })
        .trim(),
]

exports.productValidators = [
    body('title')
        .isLength(3)
        .withMessage('Минимальная длинна названия 3 символа')
        .trim(),
    body('price').isNumeric().withMessage('Введите корректную цену'),
    body('img').isURL().withMessage('Введите URL картинки'),
]
