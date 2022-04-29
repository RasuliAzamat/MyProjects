const keys = require('../keys')

module.exports = function (oldName, newName, email) {
    return {
        to: email,
        from: keys.EMAIL_FROM,
        subject: 'Я сохранил твои изменения :)',
        html: `
            <h1>Привет, ${newName}!</h1>
            <p>Ваши данные были обновлены: имя "${oldName}" изменен на "${newName}". Удачного пользования!</p>
            <br />
            <p>Ссылка на сайт - <a href="${keys.BASE_URL}">Коллекция мини-приложений</a></p>
        `,
    }
}
