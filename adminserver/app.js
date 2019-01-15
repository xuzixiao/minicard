const Koa = require('koa');
//const bodyParser = require('koa-bodyparser');
const path=require('path');
const koaBody=require('koa-body');
const static=require('koa-static');
const controller = require('./controller');
const app = new Koa();
const cors = require('koa2-cors');


//解决跨域问题
app.use(cors({
    origin:"*",
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}))
//配置静态资源目录为根目录
const staticPath='./';
app.use(static(
    path.resolve(__dirname,staticPath)
));
// log request URL:
app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    await next();
});
// parse request body:
// app.use(bodyParser());
app.use(koaBody({
    multipart:true,
    formidable:{
        uploadDir:path.join(__dirname,'public/upload/'),//设置文件上传目录
        keepExtensions:true,
        maxFieldsSize:2*1024*1024,
        onFileBegin:(name,file)=>{

        }
    }
}))

// add controllers:
app.use(controller());

app.listen(4000);
console.log('app started at port 4000...');
