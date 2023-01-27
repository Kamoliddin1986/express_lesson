const express = require('express')
const UsersController = require('../controller/users.controller')

let router = express.Router()

router
    .get('/users', UsersController.GET)
    .post('/user', UsersController.POST)
    .put('/user/:id', UsersController.PUT)
    .delete('/user/:id', UsersController.DELETE)

module.exports = router