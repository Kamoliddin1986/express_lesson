const express = require('express')

const AnimalsController = require('../controller/animals.controller')
const isLogged = require('../middleware/isLogedMiddlewere')

let router = express.Router()

router
      .get('/animals',isLogged, AnimalsController.GET)
      .get('/animals/create_animal',isLogged, AnimalsController.CREATE_ENIMAL)
      .post('/animals', isLogged,AnimalsController.POST)
      .post('/update_animal_by_id',isLogged,AnimalsController.PUT)
      .get('/animal/:id',isLogged, AnimalsController.DELETE)
      .get('/update_animal/:id',isLogged, AnimalsController.UPDATE_ANIMAL)
      .get('/about_animal/:id',isLogged, AnimalsController.ABOUT_ANIMAL)
 


module.exports = router