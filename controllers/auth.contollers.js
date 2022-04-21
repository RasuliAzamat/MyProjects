const bcrypt = require('bcryptjs')
const crypto = require('crypto')
const nodemailer = require('nodemailer')
const sendgrid = require('nodemailer-sendgrid-transport')
const { body, validationResult } = require('express-validator/check')
const keys = require('../keys')
const User = require('../models/user.model')
const regMail = require('../emails/registration.email')
const resetMail = require('../emails/reset.email')

const transporter = nodemailer.createTransport(
    sendgrid({
        auth: { api_key: keys.SEND_GREED_API_KEY },
    })
)

const getLogin = async (req, res) => {
    res.render('auth/login', {
        title: 'MyStore | Авторизация',
        isLogin: true,
        registerError: req.flash('registerError'),
        loginError: req.flash('loginError'),
    })
}

const getLogout = async (req, res) => {
    req.session.destroy(() => {
        res.redirect('/auth/login#login')
    })
}

const getReset = (req, res) => {
    res.render('auth/reset', {
        title: 'MyStore | Забыли пароль?',
        error: req.flash('error'),
    })
}

const postLogin = async (req, res) => {
    try {
        const { email, password } = req.body
        const candidate = await User.findOne({ email })

        if (candidate) {
            const areSame = await bcrypt.compare(password, candidate.password)

            if (areSame) {
                req.session.user = candidate
                req.session.isAuthenticated = true
                req.session.save(err => {
                    if (err) throw err
                    else res.redirect('/')
                })
            } else {
                req.flash('loginError', 'Неверный пароль!')
                res.redirect('/auth/login#login')
            }
        } else {
            req.flash(
                'loginError',
                'Пользователь с таким email не зарегестрирован!'
            )
            res.redirect('/auth/login#login')
        }
    } catch (error) {
        console.log(error)
    }
}

const postRegister = async (req, res) => {
    try {
        const { name, email, password } = req.body

        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            req.flash('registerError', errors.array()[0].msg)
            return res.status(422).redirect('/auth/login#register')
        }

        const hashPassword = await bcrypt.hash(password, 10)
        const user = new User({ name, email, password: hashPassword })
        await user.save()

        req.session.user = user
        req.session.isAuthenticated = true
        req.session.save(err => {
            if (err) throw err
            else res.redirect('/')
        })
        await transporter.sendMail(regMail(name, email))
    } catch (error) {
        console.log(error)
    }
}

const postReset = async (req, res) => {
    try {
        crypto.randomBytes(32, async (err, buffer) => {
            if (err) {
                req.flash(
                    'error',
                    'Что-то пошло не так, поворите попытку чуть похже.'
                )
                return res.redirect('/auth/reset')
            }
            const token = buffer.toString('hex')
            const candidate = await User.findOne({ email: req.body.email })

            if (candidate) {
                candidate.resetToken = token
                candidate.resetTokenExp = Date.now() * 3600
                await candidate.save()
                await transporter.sendMail(
                    resetMail(candidate.name, candidate.email, token)
                )
                res.redirect('/auth/login')
            } else {
                req.flash('error', 'Такой email не зарегестрирован.')
                return res.redirect('/auth/reset')
            }
        })
    } catch (error) {
        console.log(error)
    }
}

const getPassword = async (req, res) => {
    if (!req.params.token) {
        return res.redirect('/auth/login')
    }

    try {
        const user = await User.findOne({
            resetToken: req.params.token,
            resetTokenExp: { $gt: Date.now() },
        })

        if (!user) {
            return res.redirect('/auth/login')
        } else {
            res.render('auth/password', {
                title: 'MyStore | Восстановить пароль',
                error: req.flash('error'),
                userId: user._id.toString(),
                token: req.params.token,
            })
        }
    } catch (error) {
        console.log(error)
    }
}

const postPassword = async (req, res) => {
    try {
        const user = await User.findOne({
            _id: req.body.userId,
            resetToken: req.body.token,
            resetTokenExp: { $gt: Date.now() },
        })

        if (!user) {
            req.flash('error', 'Ошибка!')
            return res.redirect('/auth/login')
        } else {
            user.password = await bcrypt.hash(req.body.password, 10)
            user.resetToken = user.resetTokenExp = undefined
            await user.save()
            res.redirect('/auth/login')
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getLogin,
    getLogout,
    getReset,
    getPassword,
    postLogin,
    postRegister,
    postReset,
    postPassword,
}
