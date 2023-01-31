const express = require('express')
const UsersController = require('../controller/users.controller')
const isLogged = require('../middleware/isLogedMiddlewere')
const isAdmin = require('../middleware/isAdmin')

let router = express.Router()

router
    .get('/users',isLogged,isAdmin, UsersController.GET)
    .post('/user',isLogged,isAdmin, UsersController.POST)
    .put('/user/:id',isLogged,isAdmin, UsersController.PUT)
    .delete('/user/:id',isLogged,isAdmin, UsersController.DELETE)
    .get('/about_user/:id',isLogged,isAdmin, UsersController.USER_ALL_POSTS)
    .get('update_user/:id', isLogged,isAdmin, UsersController.UPDATE_USER)

module.exports = router