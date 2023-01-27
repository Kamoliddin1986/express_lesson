const express = require('express')

const authController = require('../controller/auth.controller')


let router = express.Router()

router
    .get('/users', authController.GET)
    .post('/user', authController.POST)
    .put('/user/:id', authController.PUT)
    .delete('/user/:id', authController.DELETE)
    .get('/user/register', authController.REGISTER)
    .post('/user/check_user', authController.CHECK_USER)
    .post('/user/login', authController.LOGIN)
    .get('/login', authController.LOGIN_PAGE)
    .get('/logout', authController.LOGOUT)

module.exports = router