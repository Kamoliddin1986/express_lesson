const { read_file, write_file,token_verify  } = require('../fs/fs_api')
const {uuid} = require('uuidv4')
const Cars = {
    GET: (req, res) => {
        let tok = token_verify(req.session.token)
        let cars = read_file('cars.json').filter(car => car.userId == tok.id)

        res.render('cars/cars_list', {
            title: 'Cars',
            isCarList: true ,
            cars
        })
    },
    CREATE_CAR: (_,res) => {
        res.render('cars/create_car', {
            title: 'Create Car',
            isCreateCar: true
        })
    },
    POST: async(req, res) => {
        const newCar = req.body


        let tok = token_verify(req.session.token)

        if(tok.id){
            let cars = read_file('cars.json')
            cars.push({
                id: uuid(),
                name: newCar.name,
                price: newCar.price,
                brand: newCar.brand,
                userId: tok.id
            })
            await write_file('cars.json', cars)
            res.redirect('/cars')

        }
    },
    PUT: async(req, res) => {

        const new_car = req.body

        let cars = read_file('cars.json')
        cars.forEach((car, idex) => {
            if(car.id == new_car.id){
                car.name = new_car.name || car.name,
                car.price = new_car.price || car.price,
                car.brand = new_car.brand || car.brand
            }
        })

       await write_file('cars.json', cars)

        res.redirect('/cars')
    },
    DELETE: async(req, res) => {
        let tok = token_verify(req.session.token)
        const car_id = req.params.id
        let cars = read_file('cars.json')
        cars.forEach((car, idx) => {
            if(tok.email == 'admin@admin'){
                if(car.id == car_id){
                    cars.splice(idx, 1)
                 }
            }else{
                if(car.id == car_id && car.userId == tok.id){
                   cars.splice(idx, 1)
                }

            }
        })

       await write_file('cars.json', cars)
       res.redirect('/cars')
    },

    UPDATE_CAR: (req,res) => {
        let tok = token_verify(req.session.token)
        let update_car_id  = req.params.id
        let cars  = read_file('cars.json')
        console.log("id______",tok);
        let foundedCar
        if(tok.email == 'admin@admin'){
            foundedCar =cars.find(car => car.id == update_car_id)
        }else{
            foundedCar = cars.find( car => (car.id == update_car_id && car.userId == tok.id))

        }
        if(foundedCar){
            res.render('cars/update_car', {
                title: 'Update car',
                car: foundedCar
            })
        }else{
            res.redirect('/cars')
        }

    },
    ABOUT_CAR: (req, res) => {
        let one_car = read_file('cars.json').find(car => car.id == req.params.id)
        res.render('cars/about_car', {
            title: 'One Car',
            car: one_car
        })
    }
}


module.exports = Cars