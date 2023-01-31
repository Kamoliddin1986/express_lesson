const express = require('express')

const AnimalsController = require('../controller/animals.controller')


let router = express.Router()



/**
 * @swagger
 * components:
 *   schemas:
 *     Animal:
 *       type: object
 *       required:
 *         - name
 *         - type
 *       properties:
 *         name:
 *           type: string
 *           description: name of animal
 *         type:
 *           type: string
 *           description: type of ananimal
 *       example:       
 *          name: fox 
 *          type: Yovvoyi    
 */

/**
 * @swagger
 * tags:
 *   name: Animals
 *   description: The animals managing API
 * /animals:
 *   post:
 *     summary: Create a new animal
 *     tags: [Animals]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Animal'
 *     responses:
 *       201:
 *         description: The created animal.
 *         
 *       500:
 *         description: Some server error
 *
 */    
router.post('/animals',AnimalsController.POST)


// animals list
/** 
* @swagger
* tags:
*   name: Animals
*   description: The animals managing API
* /animals:
*   get:
*     summary: Lists all the animals
*     tags: [Animals]
*     responses:
*       200:
*         description: ok
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/Animal'
*/
    router.get('/animals', AnimalsController.GET)


    // get one animal
/** 
* @swagger
* /animal/{id}:
*   get:
*     summary: Get the animal by id
*     tags: [Animals]
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: string
*         required: true
*         description: The animal id
*     responses:
*       200:
*         description: The animal response by id
*         content:
*           application/json:
*             schema:
*                  $ref: '#/components/schemas/Animal'
*       404:
*         description: The animal was not found
*/
router.get('/animal/:id', AnimalsController.ONE_ANIMAL)


// delete one animal
/** 
* @swagger
* /animal/{id}:
*  delete:
*     summary: Remove the animal by id
*     tags: [Animals]
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: string
*         required: true
*         description: The animal id
*
*     responses:
*       200:
*         description: The animal was deleted
*       404:
*         description: The animal was not found
*/

router.delete('/animal/:id',AnimalsController.DELETE)


//update one animal
/** 
*  @swagger
* /animal/{id}:
*   put:
*    summary: Update the animal by the id
*    tags: [Animals]
*    parameters:
*      - in: path
*        name: id
*        schema:
*          type: string
*        required: true
*        description: The animal id
*    requestBody:
*      required: true
*      content:
*        application/json:
*          schema:
*            $ref: '#/components/schemas/Animal'
*    responses:
*      200:
*        description: The animal was updated
*        content:
*          application/json:
*            schema:
*              $ref: '#/components/schemas/Animal'
*      404:
*        description: The animal was not found
*      500:
*        description: Some error happened
*/
router.put('/animal/:id',AnimalsController.PUT)

 


module.exports = router