const { read_file, write_file,token_verify  } = require('../fs/fs_api')
const {uuid} = require('uuidv4')
const Cars = {
    GET: (_, res) => {

        let cars = read_file('cars.json')

        res.status(200).send(cars)
    },
    GET_CAR_BY_ID: (req,res) =>{
        let car = read_file('cars.json').find(car => car.id == req.params.id)

        res.status(200).send(car)
    },
    POST: async(req, res) => {
        const newCar = req.body

            let cars = read_file('cars.json')
            cars.push({
                id: uuid(),
                name: newCar.name,
                price: newCar.price,
                brand: newCar.brand,
            })
            await write_file('cars.json', cars)
            res.status(200).send('Car was created!!!')

        },
    PUT: async(req, res) => {

        const new_car = req.body

        let cars = read_file('cars.json')
        cars.forEach((car, idex) => {
            if(car.id == req.params.id){
                car.name = new_car.name || car.name,
                car.price = new_car.price || car.price,
                car.brand = new_car.brand || car.brand
            }
        })

       await write_file('cars.json', cars)

        res.status(200).send('Car was updated!!!')
    },
    DELETE: async(req, res) => {

        const car_id = req.params.id
        let cars = read_file('cars.json')
        cars.forEach((car, idx) => {
            if(car.id == car_id){
               cars.splice(idx, 1)
            }
        })

       await write_file('cars.json', cars)
       res.status(200).send('Car was deleted!!!')
    }   
}


module.exports = Cars