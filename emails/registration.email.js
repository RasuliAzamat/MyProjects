const keys = require('../keys')

module.exports = function (name, email) {
    return {
        to: email,
        from: keys.EMAIL_FROM,
        subject: 'Спасибо за регистрацию!',
        html: `
            <h1>Здравствуйте, ${name}!</h1>
            <p>Ваши данные были сохранены, а аккаунт создан. Теперь можете использовать весь функционал приложения</p>
            <br />
            <p>Ссылка на сайт - <a href="${keys.BASE_URL}/projects">Магазин товаров</a></p>
        `,
    }
}
