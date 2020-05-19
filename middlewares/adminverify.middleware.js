const JsonData = require('../listUser.json');


module.exports.adminverify = function(req, res, next)
{
    if(req.cookies.adminid || res.header.adminid)
    {
        next();
    }
    else
    {
       return res.send('You dont have right to access this page!');
    }
}