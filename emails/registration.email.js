const keys = require('../keys')

module.exports = function (name, email) {
    return {
        to: email,
        from: keys.EMAIL_FROM,
        subject: 'Спасибо за регистрацию :)',
        html: `
            <h1>Привет, ${name}!</h1>
            <p>Твои данные были сохранены, а аккаунт создан. Я рад, что тебе интересно то, что я делаю)) Теперь можежь смотреть и использовать исходники приложений, которые я когда-то собрал.</p>
            <br />
            <p>Ссылка на сайт - <a href="${keys.BASE_URL}/projects">Коллекция мини-приложений</a></p>
        `,
    }
}
