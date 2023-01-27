const fs = require('fs')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

const read_file = (file_name) =>{
    return JSON.parse(fs.readFileSync(`./model/${file_name}`, 'utf8'))
}


const write_file = (file_name, data) => {
    return fs.writeFile(`./model/${file_name}`, JSON.stringify(data, null, 4), (err) => {
        if(err) throw err;
        console.log('Created!');
    })

} 

const token_verify = (token) => {
    let user = {
        id: false
    }
    try {
        let user = jwt.verify(token, process.env.SECRET_KEY);
        return user
        
    } catch (error) {
        return user
    }
}


module.exports = {
    read_file,
    write_file,
    token_verify
}