const router = require('koa-router'),
	  View = require('../controller/page'),
	  Api = require('../controller/api'),
	  Common = require('../controller/common'),
	  Validate = require('../middleware/validate');

//路由处理，首页指定用index函数处理，但需要先经过validate函数校验
var page = new router();
page.get('/', View.index)
   .get('/register', View.register)
   .get('/login', View.login)
   .get('/profile', Common.checkLogin, View.profile)
   .get('/logout', Common.setSessions, Common.clearSession, View.logout)
   .get('/resetpwd', View.resetPwd);

var api = new router();
api.post('/register', Validate.register, Api.register, Common.logined)
   .post('/login', Validate.login, Api.login, Common.logined)
   .post('/changepwd', Common.checkLogin, Validate.changePwd, Api.changePwd, Common.respond)
   .post('/resetpwd', Validate.resetPwd, Api.resetPwd, Common.respond)
   .post('public/user/')
   .post('public/login/')
   .post('public/logout');


exports.page  = page.middleware();
exports.api  = api.middleware();