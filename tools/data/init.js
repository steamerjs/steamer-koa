/**
 * mongodb 数据初始化
 */
"use strict";

var co = require('co');
var db = require('../config/mongo'),
	wrap = require('co-monk');

var users = wrap(db.get('users'));

co(function* () {
  	var result = yield users.find({privilege:'admin'});
  	// 若没有admin，则新建一个
  	if (!result.length) {
  		yield users.insert({
  			username: "steamer@gmail.com", 
  			password: "7c222fb2927d828af22f592134e8932480637c0d",  // password:12345678
  			reg_time: Date.now(),
  			privilege: "admin"
  		});
  	}
  	
  	return null;
  	// return result;
}).then(function (value) {
  	db.close();
}, function (err) {
  	console.error(err.stack);
  	db.close();
});


