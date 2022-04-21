const { Router } = require('express')
const router = Router()
const auth = require('../middlewares/auth.middleware')
const { productValidators } = require('../helpers/validators')
const {
    getProducts,
    getEdit,
    postEdit,
    postRemove,
    getId,
} = require('../controllers/products.controllers')

router.get('/', getProducts)
router.get('/:id', getId)
router.get('/:id/edit', auth, getEdit)
router.post('/edit', auth, productValidators, postEdit)
router.post('/remove', auth, postRemove)

module.exports = router
