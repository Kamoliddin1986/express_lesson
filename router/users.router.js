const express = require('express')
const UsersController = require('../controller/users.controller')


let router = express.Router()
/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - username
 *         - email
 *         - password
 *         - comfirm_password
 *       properties:
 *         username:
 *           type: string
 *           description: The username of your user
 *         email:
 *           type: string
 *           description: The user 
 *         password:
 *           type: string
 *           description: passwordinggizni kiriting
 *         comfirm_password:
 *           type: string
 *           description: passwordni takrorlang
 *       example:       
            username: NAME
            email: NAME@gamail.com
            password: "123456"
            confirm_password: "123456"
    
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: The users managing API
 * /user:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: The created user.
 *         
 *       500:
 *         description: Some server error
 *
 */    
router.post('/user', UsersController.POST)


// users list
/** 
* @swagger
* tags:
*   name: Users
*   description: The users managing API
* /users:
*   get:
*     summary: Lists all the users
*     tags: [Users]
*     responses:
*       200:
*         description: ok
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/User'
*/
    router.get('/users', UsersController.GET)


    // get one user
/** 
* @swagger
* /user/{id}:
*   get:
*     summary: Get the user by id
*     tags: [Users]
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: string
*         required: true
*         description: The user id
*     responses:
*       200:
*         description: The user response by id
*         content:
*           application/json:
*             schema:
*                  $ref: '#/components/schemas/User'
*       404:
*         description: The user was not found
*/
router.get('/user/:id', UsersController.ONE_USER)


// delete one user
/** 
* @swagger
* /user/{id}:
*  delete:
*     summary: Remove the user by id
*     tags: [Users]
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: string
*         required: true
*         description: The user id
*
*     responses:
*       200:
*         description: The user was deleted
*       404:
*         description: The user was not found
*/

router.delete('/user/:id',UsersController.DELETE)


//update one user
/** 
*  @swagger
* /user/{id}:
*   put:
*    summary: Update the user by the id
*    tags: [Users]
*    parameters:
*      - in: path
*        name: id
*        schema:
*          type: string
*        required: true
*        description: The user id
*    requestBody:
*      required: true
*      content:
*        application/json:
*          schema:
*            $ref: '#/components/schemas/User'
*    responses:
*      200:
*        description: The user was updated
*        content:
*          application/json:
*            schema:
*              $ref: '#/components/schemas/User'
*      404:
*        description: The user was not found
*      500:
*        description: Some error happened
*/

router.put('/user/:id', UsersController.PUT)
 

module.exports = router