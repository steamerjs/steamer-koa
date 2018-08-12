const Koa = require('koa');
const co = require('co');
const logger = require('koa-logger');
const render = require('koa-swig');
const serve = require('koa-static');
const session = require('koa-session');
const path = require('path');
const cors = require('@koa/cors');
const app = new Koa();
const routers = require('./router');
const config = require('../config/project');

let templatePath = path.resolve('./src/view/');
let staticPath = path.resolve('./src/static/');

// session处理， 默认1天时间
app.keys = ['steamer-koa'];
app.use(session({
    maxAge: 86400000,
}, app));

// 模板渲染
app.context.render = co.wrap(render({
    root: templatePath,
    autoescape: true,
    cache: false,
    ext: 'html'
}));

// 设置跨域头
app.use(cors({
    origin: (ctx) => {
        let origin = ctx.headers.origin;
        origin = origin.replace('https://', '').replace('http://', '');

        let apps = Object.keys(config.apps || {});
        if (apps.includes(origin)) {
            console.log(`allow origin: ${origin}`);
            return 'https://' + origin;
        }

        return null;
    },
    credentials: true
}));

routers.forEach((route) => {
    app.use(route);
});

// 处理静态文件
app.use(serve(staticPath));

// 使用logger日志库
app.use(logger());

// app.use(bodyParser());

app.listen(config.port, function(err) {
    if (err) {
        console.error(err);
    }
    else {
        console.info(`Listening on port %s. Open up http://${config.host}:%s/ in your browser.`, config.port, config.port);
    }
});
