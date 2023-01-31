const express = require('express')
const CarsController = require('../controller/cars.controller')
let router = express.Router()


/**
 * @swagger
 * components:
 *   schemas:
 *     Car:
 *       type: object
 *       required:
 *         - name
 *         - price
 *         - brand
 *       properties:
 *         name:
 *           type: string
 *           description: model of car
 *         price:
 *           type: string
 *           description: price of car
 *         brand:
 *           type: string
 *           description: auto brand
 *       example:    
 *      "name": "spark"
 *      "price": "1"
 *      "brand": "Chevrolet"
    
 */

/**
 * @swagger
 * tags:
 *   name: Cars
 *   description: The Cars managing API
 * /car:
 *   post:
 *     summary: Create a new car
 *     tags: [Cars]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Car'
 *     responses:
 *       201:
 *         description: The created car.
 *         
 *       500:
 *         description: Some server error
 *
 */    

router.post('/car',CarsController.POST)

// get one car
/** 
* @swagger
* /car/{id}:
*   get:
*     summary: Get the car by id
*     tags: [Cars]
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: string
*         required: true
*         description: The car id
*     responses:
*       200:
*         description: The car response by id
*         content:
*           application/json:
*             schema:
*                  $ref: '#/components/schemas/Car'
*       404:
*         description: The car was not found
*/

router.get('/car/:id',CarsController.GET_CAR_BY_ID)


// cars list
/** 
* @swagger
* tags:
*   name: Cars
*   description: The cars managing API
* /cars:
*   get:
*     summary: Lists all the cars
*     tags: [Cars]
*     responses:
*       200:
*         description: ok
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/Car'
*/

router.get('/cars',CarsController.GET)
   
// delete one car
/** 
* @swagger
* /car/{id}:
*  delete:
*     summary: Remove the car by id
*     tags: [Cars]
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: string
*         required: true
*         description: The car id
*
*     responses:
*       200:
*         description: The car was deleted
*       404:
*         description: The car was not found
*/

router.delete('/car/:id',CarsController.DELETE)


//update one car
/** 
*  @swagger
* /car/{id}:
*   put:
*    summary: Update the car by the id
*    tags: [Cars]
*    parameters:
*      - in: path
*        name: id
*        schema:
*          type: string
*        required: true
*        description: The car id
*    requestBody:
*      required: true
*      content:
*        application/json:
*          schema:
*            $ref: '#/components/schemas/Car'
*    responses:
*      200:
*        description: The car was updated
*        content:
*          application/json:
*            schema:
*              $ref: '#/components/schemas/Car'
*      404:
*        description: The car was not found
*      500:
*        description: Some error happened
*/

router.put('/car/:id',CarsController.PUT)
   


module.exports = router