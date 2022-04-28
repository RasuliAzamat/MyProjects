const { Router } = require('express')
const { getHome, getTicTacToeWyp } = require('../controllers/home.controllers')
const router = Router()

router.get('/', getHome)
router.get('/tic-tac-toe-wyp', getTicTacToeWyp)

module.exports = router
