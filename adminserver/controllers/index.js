var fn_index = async (ctx, next) => {
    console.log("接口测试");
    next();
};


module.exports = {
    '*': fn_index,
};