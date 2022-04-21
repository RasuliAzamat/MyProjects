const { Router } = require('express')
const auth = require('../middlewares/auth.middleware')
const router = Router()
const {
    getCart,
    postAdd,
    deleteById,
} = require('../controllers/cart.controllers')

router.get('/', getCart)
router.post('/add', auth, postAdd)
router.delete('/remove/:id', auth, deleteById)

module.exports = router
