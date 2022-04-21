module.exports = nodemailer.createTransport(
    sendgrid({
        auth: { api_key: keys.SEND_GREED_API_KEY },
    })
)
