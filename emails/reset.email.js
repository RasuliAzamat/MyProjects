const keys = require('../keys')

module.exports = function (name, email, token) {
    return {
        to: email,
        from: keys.EMAIL_FROM,
        subject: 'Восстановление доступа!',
        html: `
            <h1>Здравствуйте, ${name}!</h1>
            <p>Вы забыли код доступа в свой аккаунт? Если нет, то проигнорируйте это сообщение. Если да, то быстрее перейдите по ссылке ниже и измените пароль</p>
            <p>Изменить пароль - <a href="${keys.BASE_URL}/auth/password/${token}">Клик</a></p>
            <br />
            <p>Ссылка на сайт - <a href="${keys.BASE_URL}/projects">Магазин товаров</a></p>
        `,
    }
}
