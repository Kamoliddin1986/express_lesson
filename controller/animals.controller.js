const {read_file, write_file,token_verify } = require('../fs/fs_api')
const {uuid} = require('uuidv4')


const Animals = {
    GET: (_,res) => {

        let animals = read_file('animals.json')

        res.status(200).send(animals)
    },
    ONE_ANIMAL: (req,res) => {
        console.log(req.params.id);
        let anim = read_file('animals.json').find(animal => animal.id == req.params.id) 
        res.status(200).send(anim)
    },
    POST: async(req,res) => {
        let animals = read_file('animals.json')
        const newAnim = req.body
        animals.push({
            id: uuid(),
            name: newAnim.name,
            type: newAnim.type,

        })
        await write_file('animals.json', animals)
        res.status(200).send("animal is created!!!")

    },
    PUT: async(req,res) => {
        let animals = read_file('animals.json')
        
        const newAnim = req.body
        animals.forEach(anim => {
            if(anim.id == req.params.id){
                anim.name = newAnim.name || anim.name,
                anim.type = newAnim.type || anim.type
            }            
        });
        await write_file ('animals.json', animals)
        res.status(200).send('animal updated!!!')
    },

    DELETE: async(req,res) => {

        let animals = read_file('animals.json')
        const anim_id = req.params.id
        const newAnim = req.body
        animals.forEach((anim,inx) => {
            if(anim.id == anim_id){
             animals.splice(inx,1)            
    }});
        await write_file ('animals.json', animals)
        res.status(200).send('animal deleted!!!')
    }
   
}

module.exports = Animals