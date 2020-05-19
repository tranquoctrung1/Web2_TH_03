const db = require('../utils/db');

const TBL_CONFIG  =  "config";

module.exports.all = function () {
    return db.load(`select * from ${TBL_CONFIG}`);
}