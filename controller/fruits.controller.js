const {read_file, write_file,token_verify } = require('../fs/fs_api')
const {uuid} = require('uuidv4')


const Fruits = {
    GET: (req,res) => {
        let tok = token_verify(req.session.token)
        let fruits = read_file('fruits.json').filter(fruit => fruit.userId == tok.id)
        res.render('fruits/fruits_list', {
            title: "fruits",
            isFruitsList: true,
            fruits
        })
    },
    CREAT_FRUIT: (_,res) => {
        res.render('fruits/create_fruit', {
            title: "Create Fruit",
            isCreateFruit: true            
        })
    },
    POST: async(req,res) => {
        const newFruit = req.body
        let fruits = read_file('fruits.json')
        let tok = token_verify(req.session.token)
        if(tok.id){
        fruits.push({
            id: uuid(),
            name: newFruit.name,
            color: newFruit.color,
            userId: tok.id
        })
        await write_file('fruits.json', fruits)
        res.redirect('/fruits')
    }
    },
    PUT: async(req,res) => {
        let fruits = read_file('fruits.json')
        const newFruit = req.body
        fruits.forEach(fruit => {
            if(fruit.id == newFruit.id){
                fruit.name = newFruit.name || fruit.name,
                fruit.color = newFruit.color || fruit.color
            }            
        });
        await write_file ('fruits.json', fruits)
        res.redirect('/fruits')
    },

    DELETE: async(req,res) => {
        let tok = token_verify(req.session.token)
        let fruits = read_file('fruits.json')
        const fruit_id = req.params.id
        const newFruit = req.body
        fruits.forEach((fruit,inx) => {
            if(fruit.id == fruit_id && fruit.userId == tok.id){
             fruits.splice(inx,1)            
    }});
        await write_file ('fruits.json', fruits)
        res.redirect('/fruits')
    },
    UPDATE_FRUIT: (req,res) => {
        let tok = token_verify(req.session.token)
        const fruit_id = req.params.id
        const fruits = read_file('fruits.json')
        let foundedFruit = fruits.find(fruit => {fruit.id == fruit_id && fruit.userId == fruit.userId})
       if(foundedFruit){
           res.render('fruits/update_fruit', {
               title: 'Update fruit',
               fruit: foundedFruit
           })
       }else{
        res.redirect('/fruits')
       }
    },
    ABOUT_FRUIT: (req,res) => {

        let one_fruit = read_file('fruits.json').find(fr => fr.id == req.params.id)
        res.render('fruits/about_fruit', {
            title: 'One fruit',
            fruit: one_fruit
        })
    }

}

module.exports = Fruits