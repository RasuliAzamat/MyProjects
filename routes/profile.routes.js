const { Router } = require('express')
const auth = require('../middlewares/auth.middleware')
const { getProfile, postProdile } = require('../controllers/profile.controllers')
const router = Router()

router.get('/', auth, getProfile)
router.post('/', auth, postProdile)

module.exports = router
