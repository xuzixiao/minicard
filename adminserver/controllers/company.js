const db=require('../config/db');
const sqlmap=require('../config/sqlmap');


var fn_list= async (ctx, next) => {
    await db.query(sqlmap.article.getartlist,[18888348998,1]).then(res=>{
        ctx.response.body = res;
    })
};

var fn_add= async (ctx, next) => {
    ctx.response.body = `<h1>添加</h1>`;
};   

module.exports = {
    'GET /companylist': fn_list,
    'POST /': fn_add
};