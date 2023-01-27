const {read_file, write_file } = require('../fs/fs_api')
const Cars = require('./cars.controller')

let users = read_file('users.json')
const Users = {
    GET: (_,res) => {
        let users = read_file('users.json')
        res.send(users)
    },
    POST: async(req, res) => {
        const nwUser = req.body
        let users = read_file('users.json')
        users.push({
            id: users.length+1,
            username: nwUser.username,
            email: nwUser.email,
            password: nwUser.password            
        })
        await write_file('users.json', users)
        res.send('User created')
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

        res.send('User is updated!')
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
        res.send('user deleted!')
    }
}

module.exports = Users