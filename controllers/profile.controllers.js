const User = require('../models/user.model')
const nodemailer = require('nodemailer')
const sendgrid = require('nodemailer-sendgrid-transport')
const keys = require('../keys')
const changeNameMail = require('../emails/changeName.email')

const transporter = nodemailer.createTransport(
    sendgrid({
        auth: { api_key: keys.SEND_GREED_API_KEY },
    })
)

const getProfile = async (req, res) => {
    res.render('profile', {
        title: `MyProjects | Профиль ${req.user.name}`,
        user: req.user.toObject(),
    })
}
const postProdile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id)

        const toChange = {
            name: req.body.name,
        }

        Object.assign(user, toChange)
        await user.save()
        await transporter.sendMail(
            changeNameMail(user.name, toChange.name, user.email)
        )
        res.redirect('/profile')
    } catch (e) {
        console.log(e)
    }
}

module.exports = { getProfile, postProdile }
