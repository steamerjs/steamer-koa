const Koa = require('koa'),
    co = require('co'),
    logger = require('koa-logger'),
    render = require('koa-swig'),
    serve = require('koa-static'),
    bodyParser = require('koa-bodyparser'),
    session = require('koa-session'),
    path = require('path'),
    app = new Koa(),
    routers = require('./router'),
    config = require('../config/project');

// session处理
app.keys = ['steamer-koa'];
app.use(session(app));

// 模板渲染
app.context.render = co.wrap(render({
    root: path.resolve(path.resolve('src/view/')),
    autoescape: true,
    cache: false,
    ext: 'html',
    // writeBody: false
}));

// 处理静态文件
app.use(serve(path.resolve('src/static/')));

// 使用logger日志库
app.use(logger());

app.use(bodyParser());

routers.forEach((route) => {
    app.use(route);
});

app.listen(config.port, function(err) {
    if (err) {
        console.error(err);
    }
    else {
        console.info('Listening on port %s. Open up http://localhost:%s/ in your browser.', config.port, config.port);
    }
});
