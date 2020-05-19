const express = require('express');
const JsonData = require('../listUser.json');
const adminModel = require('../models/admin.model');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const route = express.Router();


route.get('/', function(req, res)
{
    if(!req.cookies)
    {
        res.cookie('adminid', '');
    }
    res.render('login', {title: "Login", value: req.cookies});
}) 

async function Remember (req, res, next)
{
    const {username, password, remember} = req.body;

    const rows = await adminModel.all();
    const usernameAdmin = rows[0].username;
    const passwordAdmin = rows[0].password;
    const adminID = rows[0].adminid;

    const isEqualPassword = await bcrypt.compare(password, passwordAdmin);

    if(username !== JsonData.admin.username || !isEqualPassword)
    {
        res.cookie('adminid', '');
        res.header.adminid = '';
        return res.send("Wrong username  or password");
    }
    else
    {
        if(remember === "on")
        {
            res.cookie('adminid', adminID);
        }
        else 
        {
            res.clearCookie('adminid');
            res.header.adminid = adminID;
        }
    }

    next();
}


route.post('/postLogin', Remember,function(req, res)
{
   res.redirect('/admin'); 
})

module.exports = route;
