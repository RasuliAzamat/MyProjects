const keys = require('../keys')

module.exports = function (name, email) {
    return {
        to: keys.EMAIL_FROM,
        from: keys.EMAIL_FROM,
        subject: 'Новый пользователь',
        html: `
            <h1>Здравствуйте, господин!</h1>
            <p>В вашем величественном приложении зарегался новый человек. Вот его данные: Имя: <strong>${name}</strong>, Почта: <strong>${email}</strong>. Хорошего дня, милорд.</p>
            <br />
            <p><a href="${keys.BASE_URL}">Ваше детище</a></p>
        `,
    }
}
