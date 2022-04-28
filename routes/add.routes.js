const { Router } = require('express')
const auth = require('../middlewares/auth.middleware')
const { getAdd, postAdd } = require('../controllers/add.controllers')

const router = Router()

router.get('/', auth, getAdd)
router.post('/', auth, postAdd)

module.exports = router
