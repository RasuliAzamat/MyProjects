const Project = require('../models/project.model')

const getHome = async (req, res) => {
    try {
        const projects = await Project.find()
            .sort({ createdAt: -1 })
            .populate('userId', 'email name')
            .select('name description tags demo source')

        res.render('index', {
            title: 'MyProjects | Главная страница',
            userId: req.user ? req.user._id.toString() : null,
            projects,
        })
    } catch (error) {
        console.log(error)
    }
}

const getTicTacToeWyp = (req, res) => {
    res.render('projects/tic-tac-toe-wyp')
}

const getCurrencyConverter = (req, res) => {
    res.render('projects/currency-converter')
}

const getNotesBoxes = (req, res) => {
    res.render('projects/notes-boxes')
}

const getOnlineTranslator = (req, res) => {
    res.render('projects/online-translator')
}

const getQuizWyp = (req, res) => {
    res.render('projects/quiz-wyp')
}

const getTodoListCdn = (req, res) => {
    res.render('projects/todo-list-cdn')
}

const get2048 = (req, res) => {
    res.render('projects/2048')
}

const getTicTacToeCdn = (req, res) => {
    res.render('projects/tic-tac-toe-cdn')
}

module.exports = {
    getHome,
    getTicTacToeWyp,
    getCurrencyConverter,
    getNotesBoxes,
    getOnlineTranslator,
    getQuizWyp,
    getTodoListCdn,
    get2048,
    getTicTacToeCdn,
}
