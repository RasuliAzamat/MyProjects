const Project = require('../models/project.model')

const getHome = async (req, res) => {
    try {
        const projects = await Project.find()
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

module.exports = { getHome, getTicTacToeWyp }
