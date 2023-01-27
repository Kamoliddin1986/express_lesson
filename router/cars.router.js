const express = require('express')
const CarsController = require('../controller/cars.controller')
const isLogged = require('../middleware/isLogedMiddlewere')

let router = express.Router()

router
   .get('/cars',isLogged, CarsController.GET)
   .get('/cars/create_car',isLogged, CarsController.CREATE_CAR)
   .post('/car',isLogged, CarsController.POST)
   .post('/update_car_by_id',isLogged, CarsController.PUT)
   .get('/car/:id',isLogged, CarsController.DELETE)
   .get('/update_car/:id',isLogged, CarsController.UPDATE_CAR)
   .get('/about_car/:id',isLogged, CarsController.ABOUT_CAR)


module.exports = router