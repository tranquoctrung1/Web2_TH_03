const db = require('../utils/db');

const TBL_USER = "user";

module.exports.all = function () {
    return db.load(`select * from ${TBL_USER}`);
}

module.exports.add = function(entity)
{
    return db.add(TBL_USER, entity);
}