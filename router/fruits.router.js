const express = require('express')

const FruitsController = require('../controller/fruits.controller')
const isLogged = require('../middleware/isLogedMiddlewere')
let router = express.Router()

router
      .get('/fruits',isLogged, FruitsController.GET)
      .get('/fruits/create_fruit',isLogged, FruitsController.CREAT_FRUIT)
      .post('/fruits',isLogged, FruitsController.POST)
      .post('/update_fruit_by_id',isLogged, FruitsController.PUT)
      .get('/fruit/:id',isLogged, FruitsController.DELETE)
      .get('/update_fruit/:id',isLogged, FruitsController.UPDATE_FRUIT)
      .get('/about_fruit/:id',isLogged, FruitsController.ABOUT_FRUIT)
 


module.exports = router