const { Router } = require('express')
const auth = require('../middlewares/auth.middleware')
const { productValidators } = require('../helpers/validators')
const { getAdd, postAdd } = require('../controllers/add.controllers')

const router = Router()

router.get('/', auth, getAdd)
router.post('/', auth, productValidators, postAdd)

module.exports = router
