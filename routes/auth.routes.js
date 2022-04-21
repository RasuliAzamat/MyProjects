const { Router } = require('express')
const { registerValidators } = require('../helpers/validators')
const {
    getLogin,
    getLogout,
    getReset,
    getPassword,
    postLogin,
    postRegister,
    postReset,
    postPassword,
} = require('../controllers/auth.contollers')
const router = Router()

router.get('/login', getLogin)
router.get('/logout', getLogout)
router.get('/reset', getReset)
router.get('/password/:token', getPassword)
router.post('/login', postLogin)
router.post('/register', registerValidators, postRegister)
router.post('/reset', postReset)
router.post('/password', postPassword)

module.exports = router
