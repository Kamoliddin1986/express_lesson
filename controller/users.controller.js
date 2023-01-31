const {read_file, write_file } = require('../fs/fs_api')
const Cars = require('./cars.controller')

let users = read_file('users.json')
const Users = {
    GET: (_,res) => {
        let users = read_file('users.json')
        res.render('admin/users_list', {
            title: 'Users',
            isAdminActive: true,
            users
        })
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
    },
    USER_ALL_POSTS: (req,res) => {
        let User_id = req.params.id
        let user = read_file("users.json").find(user => user.id == User_id)
        let car_posts = read_file('cars.json').filter(car => car.userId == User_id)
        let fruit_posts = read_file('fruits.json').filter(fruit => fruit.userId == User_id)
        let animal_posts = read_file('animals.json').filter(animal => animal.userId == User_id)
        res.render('admin/about_user', {
            title: 'about user',
            user,
            car_posts,
            fruit_posts,
            animal_posts
        }
        )
    },
    UPDATE_USER: (req,res) => {
        let id = req.params.id
        let foundedUsers = read_file('users.json').find(user => user.id == id)
        res.render('admin/update_user', {
            title: 'update user',
            foundedUsers
        })
    }
}

module.exports = Users