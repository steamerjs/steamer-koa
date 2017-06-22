"use strict";

const Users = require('../model/user').Users,
	  common = require('./common'),
	  utils = require('../common/utils');


const ERR_COMMON = 1,
	  ERR_FORMAT = 2,
	  ERR_INSERT = 3,
	  ERR_LOGIN = 4,
	  ERR_NEXIST = 5,
	  ERR_RESET = 6;

exports.register = function* (next) {

	this.state.api = "register";

	if (!this.errors) {
		var result = yield Users.register(this.request.body);
		if (result) {
			this.state.user = result;
		}
		else {
			this.errors = [{db: "录上数据失败"}];
			this.state.extra = {
				ret: ERR_INSERT,
				msg: this.errors
			};
		}
	}
	else {
		this.state.extra = {
			ret: ERR_FORMAT,
			msg: this.errors
		}; 
	}

	yield *next;
};

exports.login = function* (next) {
	this.state.api = "login";

	if (!this.errors) {
		var result = yield Users.login(this.request.body);
		if (result) {
			this.state.user = result;
		}
		else {
			this.errors = [{db: "用户名或密码错误"}];
			this.state.extra = {
				ret: ERR_LOGIN,
				msg: this.errors
			};
		}
	}
	else {
		this.state.extra = {
			ret: ERR_FORMAT,
			msg: this.errors
		}; 
	}

	yield *next;
};

exports.changePwd = function* (next) {
	this.state.api = "changePwd";

	if (!this.errors) {
		var pwd = this.request.body.password,
			sessions = this.state.sessions;

		var result = yield Users.changePwd(sessions.uid, pwd);
		console.log(result);
	}
	else {
		this.state.extra = {
			ret: ERR_FORMAT,
			msg: this.errors
		}; 
	}

	yield *next;
};

exports.resetPwd = function *(next) {
	this.state.api = "resetPwd";

	if (!this.errors) {
		var username = this.request.body.username;
		var result = yield Users.getByUserName(username);

		if (result) {
			var pwd = utils.generatePwd();

			var r = yield Users.resetPwd(username, pwd);

			if (r) {
				common.sendEmail.bind(this)(username, "重置密码", "", "你的密码重置为:" + pwd);
			}
			else {
				this.errors = [{db: "重置密码失败"}];
				this.state.extra = {
					ret: ERR_RESET,
					msg: this.errors
				}; 
			}
			
		}
		else {
			this.errors = [{db: "没有该用户"}];
			this.state.extra = {
				ret: ERR_NEXIST,
				msg: this.errors
			}; 
		}

	}
	else {
		this.state.extra = {
			ret: ERR_FORMAT,
			msg: this.errors
		}; 
	}

	
	yield *next;
};