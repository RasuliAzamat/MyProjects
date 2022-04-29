const keys = require('../keys')

module.exports = function (name, email) {
    return {
        to: email,
        from: keys.EMAIL_FROM,
        subject: 'Спасибо за регистрацию :)',
        html: `
            <h1>Привет, ${name}!</h1>
            <p>Твой акаунт был создан и привязан к <strong>${email}</strong>. Я рад, что тебе интересно то, что я делаю)) Теперь можежь смотреть и использовать исходники приложений, которые я когда-то собрал, хехе)))</p>
            <br />
            <p>Ссылка на сайт - <a href="${keys.BASE_URL}">Коллекция мини-приложений</a></p>
        `,
    }
}
