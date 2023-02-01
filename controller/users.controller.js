const {read_file, write_file,token_verify } = require('../fs/fs_api')
const Cars = require('./cars.controller')

let users = read_file('users.json')
const Users = {
    GET: (_,res) => {
        let users = read_file('users.json').filter(user => user.username!='admin')
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
    RENDER_USER_UPDATE_FORM: (req,res) => {
        let user = read_file('users.json').find(user => user.id == req.params.id)
        res.render('admin/user_update_form', {
            title: 'user update form',
            user
        })
    },
    ADMIN_UPDATE_USER: (req,res) => {
        
        const nwUser = req.body
        let existing_username_or_email = false

        let users = read_file('users.json')
        if(users.find(user => (user.id !=nwUser.id && (user.username == nwUser.username || user.email == nwUser.email)))){
            existing_username_or_email = true
        }
        if(!existing_username_or_email){
            users.forEach(user => {
                if(user.id == nwUser.id){
                    user.username = nwUser.username || user.username
                    user.email = nwUser.email || user.email
                    user.role = nwUser.role || user.role
                }
            })
            write_file('users.json',users)
            return res.redirect('/users')
        }else{
            res.send('Username or email is exists!')
        }
    }
}

module.exports = Users