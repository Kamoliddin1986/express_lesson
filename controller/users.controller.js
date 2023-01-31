const {uuid} = require('uuidv4')
const {read_file, write_file } = require('../fs/fs_api')
const Cars = require('./cars.controller')

let users = read_file('users.json')
const Users = {
    GET: (_,res) => {
        let users = read_file('users.json')
        res.status(200).send(users)
    },
    POST: async(req, res) => {
        const nwUser = req.body
        let users = read_file('users.json')
        users.push({
            id: uuid(),
            username: nwUser.username,
            email: nwUser.email,
            password: nwUser.password            
        })
        await write_file('users.json', users)
        res.status(201).send({
            msg: 'The created user'
        })
    },
    ONE_USER: (req,res) => {
        let user = read_file('users.json').find(user => user.id == req.params.id)
        res.status(200).send(user)
    },
    PUT: async(req, res) => {
        const user_id = req.params.id
        const nwUser = req.body

        let users = read_file('users.json')
        users.forEach((user,inx) => {
            if(user.id == user_id){
                user.username = nwUser.username || user.username
                user.email = nwUser.email || user.email
                user.password = nwUser.password || user.password
            }
        })
        await write_file('users.json', users)

        res.status(200).send({
            msg: "user updated"
        })
    },
    DELETE: async(req,res) => {
        const user_id = req.params.id
        let users = read_file('users.json')
        users.forEach((user,inx) => {
            if(user.id == user_id){
                users.splice(inx,1)
            }
        })
        await write_file('users.json', users)
        res.status(200).send({
            msg: 'User is deleted'
        })
    }
}

module.exports = Users