require('dotenv').config()
const express = require('express')
const exphbs = require('express-handlebars')
const carsRouter = require('./router/cars.router')
const animalsRouter = require('./router/animals.router')
const fruitsRouter = require('./router/fruits.router')
const usersRouter = require('./router/users.router')
const authController = require('./router/auth.router')
const session = require('express-session')
const middleWare = require('./middleware/variable')


const app = express() 

const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
});

app.engine('hbs',hbs.engine)
app.set('view engine', 'hbs');
app.set('views', 'views');
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(middleWare)

app.use(carsRouter) 
app.use(animalsRouter)
app.use(fruitsRouter)
app.use(usersRouter)
app.use(authController)




const port = process.env.PORT || 4000
app.listen(port, () =>{
    console.log(port);
})