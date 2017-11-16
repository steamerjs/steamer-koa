const Router = require('koa-router'),
    Mount = require('koa-mount'),
    Page = require('../controller/page');

let page = new Router();
page.get('/', Page.index);

// 路由映射
module.exports = [
    Mount('/', page.routes())
];