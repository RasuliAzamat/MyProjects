const getHome = (req, res) => {
    res.render('index', {
        title: 'MyStore | Главная страница',
        isHome: true,
    })
}

module.exports = { getHome }
