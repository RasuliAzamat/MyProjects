const { Router } = require('express')
const auth = require('../middlewares/auth.middleware')
const router = Router()
const { getOrders, postOrders } = require('../controllers/orders.controllers')

router.get('/', auth, getOrders)
router.post('/', auth, postOrders)

module.exports = router
