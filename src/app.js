'use strong';

const koa = require('koa');
const mount = require('koa-mount');
const logger = require('koa-logger');
const render = require('koa-swig');
const serve = require('koa-static');
const router = require('./config/router');
const bodyParser = require('koa-bodyparser');
const session = require('koa-session');
const validate = require('koa-validate');
const fs = require('fs');
const path = require('path');
const app = koa();
const config = require("../tools/config");

// koa-validte调用
validate(app);

// session处理
app.keys = ["tx plugin map"];
app.use(session(app));

app.context.render = render({
	root: path.resolve(path.resolve('src/view/')),
	autoescape: true,
	cache: false,
	ext: 'html'
});

// 处理静态文件
app.use(serve(path.resolve('src/static/')));

//使用logger日志库
app.use(logger());

app.use(bodyParser());

// 路由映射 
app.use(mount('/', router.page));
app.use(mount('/api', router.api));

app.listen(config.port, function(err) {
	if (err) {
		console.error(err);
	}
	else {
		console.info("Listening on port %s. Open up http://localhost:%s/ in your browser.", config.port, config.port);
	}
});
