const Project = require('../models/project.model')

const getAdd = (req, res) => {
    res.render('add', {
        title: 'MyProjects | Добавить проект',
    })
}

const postAdd = async (req, res) => {
    const project = new Project({
        name: req.body.name,
        description: req.body.description,
        tags: req.body.tags,
        demo: req.body.demo,
        source: req.body.source,
        userId: req.user,
    })

    try {
        await project.save()
        res.redirect('/')
    } catch (e) {
        console.log(e)
    }
}

module.exports = { getAdd, postAdd }
