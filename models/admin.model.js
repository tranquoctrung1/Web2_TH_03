const db = require('../utils/db');

const TBL_ADMIN  =  "admin";

module.exports.all = function () {
    return  db.load(`select * from ${TBL_ADMIN}`);
};


module.exports.update = function (entity)
{
    const condition = {
        adminid : entity.adminid
    }

    delete entity.adminid;
    return  db.patch(TBL_ADMIN, entity, condition);
};