const { Router } = require('express')
const {
    getHome,
    getTicTacToeWyp,
    getCurrencyConverter,
    getNotesBoxes,
    getOnlineTranslator,
    getQuizWyp,
    getTodoListCdn,
} = require('../controllers/home.controllers')
const router = Router()

router.get('/', getHome)
router.get('/tic-tac-toe-wyp', getTicTacToeWyp)
router.get('/currency-converter', getCurrencyConverter)
router.get('/notes-boxes', getNotesBoxes)
router.get('/online-translator', getOnlineTranslator)
router.get('/quiz-wyp', getQuizWyp)
router.get('/todo-list-cdn', getTodoListCdn)

module.exports = router
