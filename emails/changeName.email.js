const keys = require('../keys')

module.exports = function (oldName, newName, email) {
    return {
        to: email,
        from: keys.EMAIL_FROM,
        subject: 'Мы сохранили ваши изменения!',
        html: `
            <h1>Здравствуйте, ${newName}!</h1>
            <p>Ваши данные были обновлены: имя "${oldName}" изменен "${newName}". Удачного пользования!</p>
            <br />
            <p>Ссылка на сайт - <a href="${keys.BASE_URL}/projects">Магазин товаров</a></p>
        `,
    }
}
