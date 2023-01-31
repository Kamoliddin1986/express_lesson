
const express = require('express')

const swaggerJsDoc = require('swagger-jsdoc')
const cors = require("cors")
const swaggerUI = require('swagger-ui-express')
const carsRouter = require('./router/cars.router')
const animalsRouter = require('./router/animals.router')
const fruitsRouter = require('./router/fruits.router')
const usersRouter = require('./router/users.router')






const options = {
    definition: {
     openapi:"3.0.0",
     info: {
         title: "My project",
         version: "1.0.0",
         description: 'My Project API Information'
        },
        servers: [
            {
                url: "http://localhost:4000"
            },
        ],
    },
    apis: ["./router/*.js"]
 }
 
 const swaggerDocs = swaggerJsDoc(options);
 const app = express() 
 app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));
 app.use(cors());
 


app.use(express.json())




app.use(carsRouter) 
app.use(fruitsRouter)
app.use(animalsRouter)
app.use(usersRouter)





const port = process.env.PORT || 4000
app.listen(port, () =>{
    console.log(port);
})