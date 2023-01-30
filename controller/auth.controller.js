const {read_file, write_file}= require('../fs/fs_api')
const {uuid} = require('uuidv4')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const e = require('express')
// const session = require('express-session')


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
    },
    REGISTER: (_,res) => {

        res.render('auth/register', {
            title: 'User register',
            isRegister: true
        })
    },
    CHECK_USER: async(req,res) => {
        const nwUser = req.body
     
        let users = read_file('users.json')
        let checkUser = false
        users.forEach(user => {
            if(user.username == nwUser.username && 
                user.email == nwUser.email && 
                nwUser.pwd == nwUser.con_pwd){

                    checkUser = true
            }
        })
        if(!checkUser) {
     
            let salt = await bcrypt.genSalt(10)
            let hashPsw = await bcrypt.hash(nwUser.pwd, salt)
            console.log(hashPsw);
            users.push({
                id: uuid(), 
                username: nwUser.username,
                email:nwUser.email,
                password: hashPsw,
                role: "User"
            })

            write_file('users.json', users)

            res.render('auth/login', {
                title: 'user login',
                isLogin: true 
            })
        }
    },
    LOGIN: async(req, res) => {
        let nwUser = req.body
        let user = read_file('users.json').find(user => user.username == nwUser.username)
           try {
               let pass = await bcrypt.compare(nwUser.pwd,user.password)
               if(pass){
                var token = jwt.sign({id: user.id, email: user.email}, process.env.SECRET_KEY, {
                        expiresIn: '2h'
                    })
                    req.session.isAuthenticated = nwUser.username        
                    req.session.token = token               
                    
                    res.redirect('/cars')

            }else{
                res.redirect('/login')

            }
           } catch (error) {
            res.redirect('/login')
           }
               
                
           
            
        
    },
    LOGIN_PAGE: (_,res) => { 
        res.render('auth/login', {
            title: 'user login',
            isLogin: true
        })
    },
    LOGOUT: (req, res) => {
        req.session.destroy(() => {

            res.redirect('/login')
        })
    }
}
module.exports = Users