const { Router } = require('express')
const {
    getHome,
    getTicTacToeWyp,
    getCurrencyConverter,
    getNotesBoxes,
    getOnlineTranslator,
    getQuizWyp,
    getTodoListCdn,
    get2048,
    getTicTacToeCdn,
} = require('../controllers/home.controllers')
const router = Router()

router.get('/', getHome)
router.get('/tic-tac-toe-wyp', getTicTacToeWyp)
router.get('/currency-converter', getCurrencyConverter)
router.get('/notes-boxes', getNotesBoxes)
router.get('/online-translator', getOnlineTranslator)
router.get('/quiz-wyp', getQuizWyp)
router.get('/todo-list-cdn', getTodoListCdn)
router.get('/2048', get2048)
router.get('/tic-tac-toe-cdn', getTicTacToeCdn)

module.exports = router
