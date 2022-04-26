const path = require('path')
const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const session = require('express-session')
const csurf = require('csurf')
const flash = require('connect-flash')
const MongoStore = require('connect-mongodb-session')(session)

const homeRoutes = require('./routes/home.routes')
// const addRoutes = require('./routes/add.routes')
const authRoutes = require('./routes/auth.routes')
const profileRoutes = require('./routes/profile.routes')

const varMiddleware = require('./middlewares/variables.middleware')
const userMiddleware = require('./middlewares/user.middleware')
const errorMiddleware = require('./middlewares/error.middleware')
const keys = require('./keys')

const app = express()

const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs',
    helpers: require('./helpers/hbs'),
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
    },
})

const store = new MongoStore({
    collection: 'sessions',
    uri: keys.MONGO_URI,
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))

app.use(
    session({
        secret: keys.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        store,
    })
)
app.use(csurf())
app.use(flash())
app.use(varMiddleware)
app.use(userMiddleware)

app.use('/', homeRoutes)
app.use('/auth', authRoutes)
app.use('/profile', profileRoutes)
app.use(errorMiddleware)

const PORT = process.env.PORT || 3000

async function start() {
    try {
        await mongoose.connect(keys.MONGO_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useFindAndModify: false,
        })

        app.listen(PORT, () =>
            console.log(`Server is running on localhost:${PORT}`)
        )
    } catch (error) {
        console.log(error)
    }
}
start()
