if (process.env.NODE_ENV === 'projection') {
    module.exports = require('./keys.prod')
} else {
    module.exports = require('./keys.dev')
}
