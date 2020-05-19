const express = require('express');
const configModel = require('../models/config.model');

const route = express.Router();


route.get('/', async function(req, res)
{
    const data =  await configModel.all();
    const homeContent = data[0].homecontent
    res.render('home', {
        title: "Home",
        homeContent
    });
}) 


module.exports = route;
