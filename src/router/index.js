const Mount = require('koa-mount');
const Page = require('./page');
const Api = require('./api');

// 路由映射
module.exports = [
    Mount('/', Page.middleware()),
    Mount('/api', Api.middleware())
];
