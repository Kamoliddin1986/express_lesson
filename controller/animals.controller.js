const {read_file, write_file,token_verify } = require('../fs/fs_api')
const {uuid} = require('uuidv4')


const Animals = {
    GET: (req,res) => {
        let tok = token_verify(req.session.token)
        let animals = read_file('animals.json').filter(animal => animal.userId == tok.id)

        res.render('animals/animals_list', {
            title: "Animals",
            isAnimalList: true,
            animals
        })
    },
    CREATE_ENIMAL: (_,res) => {
        res.render('animals/create_animal', {
            title: 'Create Animal',
            isCreateAnimal: true
        })
    },
    POST: async(req,res) => {
        let animals = read_file('animals.json')
        const newAnim = req.body
        let tok = token_verify(req.session.token)
        if(tok.id){
        animals.push({
            id: uuid(),
            name: newAnim.name,
            type: newAnim.type,
            userId: tok.id
        })
        await write_file('animals.json', animals)
        res.redirect('/animals')
    }
    },
    PUT: async(req,res) => {
        let animals = read_file('animals.json')
        const newAnim = req.body
        animals.forEach(anim => {
            if(anim.id == newAnim.id){
                anim.name = newAnim.name || anim.name,
                anim.type = newAnim.type || anim.type
            }            
        });
        await write_file ('animals.json', animals)
        res.redirect('/animals')
    },

    DELETE: async(req,res) => {
        let tok = token_verify(req.session.token)
        let animals = read_file('animals.json')
        const anim_id = req.params.id
        const newAnim = req.body
        animals.forEach((anim,inx) => {
            if(anim.id == anim_id && anim.userId == tok.id){
             animals.splice(inx,1)            
    }});
        await write_file ('animals.json', animals)
        res.redirect('/animals')
    },
    UPDATE_ANIMAL: (req, res) => {
        let tok = token_verify(req.session.token)
        let update_animal_id = req.params.id
        let animals = read_file('animals.json')
        let foundedEnim = animals.find(enim => {enim.id == update_animal_id && enim.userId == tok.id})
        if(foundedEnim){
            res.render('animals/update_animal', {
                title: 'Update Enimal',
                animal: foundedEnim
            })
        }else{
            res.redirect('/animals')
        }

    },

    ABOUT_ANIMAL: (req, res) => {
        let one_animal = read_file('animals.json').find(anim => anim.id == req.params.id)
        res.render('animals/about_animal', {
            title: 'One animal',
            animal: one_animal
        })
    }

}

module.exports = Animals