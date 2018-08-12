const Router = require('koa-joi-router');
const Page = require('../controller/page');

let page = Router();
page.get('/', Page.index);

module.exports = page;
