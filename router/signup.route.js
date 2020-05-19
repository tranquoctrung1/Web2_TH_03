const express = require('express');
const multer  = require('multer');
const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const upload = multer({ dest: './public/images' });

const route = express.Router();

route.get('/', function(req, res)
{
   res.render('signup', {title: "Sign Up"});
}) 


route.post('/postSignUp', upload.single('avatar'), async function(req, res)
{   
        const {email, password, name, attend} = req.body;
        let avatar = "";
        if(req.file)
        {
            avatar = req.file.path.split('/').slice(1).join('/');
        }

        const rows = await userModel.all();

        // create new user id
        let newUserId = "";
        if(rows.length != 0)
        {
            newUserId = "user" + (parseInt(rows[rows.length -1 ].userid.match(/(\d+)/)[0]) + 1); 
        }
        else 
        {
            newUserId = "user1";
        }
        
        let newAttend = attend === "on" ? true : false;
        
        //hash password
        const hashPassword = await bcrypt.hash(password, saltRounds)

        const entity = { 
            userid: newUserId,
            name,
            email,
            password,
            attend: newAttend,
            avatar,
        }

        userModel.add(entity).then((result) =>
        {
            res.redirect('/');
        })
        .catch((err) =>
        {
            throw err;
        });
})

module.exports = route;
