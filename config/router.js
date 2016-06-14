const router = require('koa-router');
const view = require('../controller/controller');

//路由处理，首页指定用index函数处理，但需要先经过validate函数校验
var API = new router();

API.get('/', view.index)
   .get('/list', view.list)
   .get('/list/:id', view.list)
   .get('/detail/', view.detail)
   .get('/create/', view.create);
   .get('/getDetail/', view.getDetail);

exports.RULE  = API.middleware();
