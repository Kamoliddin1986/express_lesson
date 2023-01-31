const {read_file, write_file,token_verify } = require('../fs/fs_api')
const {uuid} = require('uuidv4')




const Fruits = {
    GET: (_,res) => {
  
        let fruits = read_file('fruits.json')
        res.status(200).send(fruits)
    },
    POST: async(req,res) => {
        const newFruit = req.body
        let fruits = read_file('fruits.json')
        fruits.push({
            id: uuid(),
            name: newFruit.name,
            color: newFruit.color
        })
        await write_file('fruits.json', fruits)
        res.status(201).send({
            msg: 'Fruit was created!!'
        })
    },
    DELETE: async(req,res) => {

        let fruits = read_file('fruits.json')
        const fruit_id = req.params.id

        fruits.forEach((fruit,inx) => {
            if(fruit.id == fruit_id){
             fruits.splice(inx,1)            
    }});
        await write_file ('fruits.json', fruits)
        res.status(200).send("Fruit was deleted!!!")
    },
    UPDATE_FRUIT: (req,res) => {
        const nwFruit = req.body
        const fruit_id = req.params.id
        const fruits = read_file('fruits.json')
        fruits.forEach((fr,inx) => {
            if(fr.id == fruit_id){
                fr.name = nwFruit.name || fr.name
                fr.color = nwFruit.color || fr.color
            }
        })
        write_file('fruits.json',fruits)

           res.status(200).send('Fruit was updated!!!')
       
    },
    GET_ONE_FRUIT: (req,res) => {

        let one_fruit = read_file('fruits.json').find(fr => fr.id == req.params.id)
        res.status(200).send(one_fruit)
    }

}

module.exports = Fruits