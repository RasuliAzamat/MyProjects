const Project = require('../models/project.model')
// const { validationResult } = require('express-validator')

const getAdd = (req, res) => {
    res.render('add', {
        title: 'MyProjects | Добавить проект',
    })
}

const postAdd = async (req, res) => {
    // const errors = validationResult(req)

    // if (!errors.isEmpty()) {
    //     return res.status(422).render('add', {
    //         title: 'MyProjects | Добавить проект',
    //         error: errors.array()[0].msg,
    //         values: {
    //             name: req.body.name,
    //             description: req.body.description,
    //             tags: req.body.tags,
    //             demo: req.body.demo,
    //             source: req.body.source,
    //         },
    //     })
    // }

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
