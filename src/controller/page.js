"use strict";

const Users = require('../model/user').Users,
	  utils = require('../common/utils'),
	  common = require('./common');

var requestSync = require('../common/requestSync');

exports.index = function* () {
    yield* this.render('index', {content: 'hey man!'});
};

exports.register = function* () {
	yield* this.render('register');
};

exports.login = function* () {
	yield* this.render('login');
};

exports.profile = function* () {
	var uid = this.state.sessions.uid;
	var user = yield Users.getById(uid);
	user = user || {};

	var privilege = {
		"admin": "管理员",
		"user": "用户"
	};
	
	yield* this.render('profile', {data: {
		"userName": user.username,
		"regTime": utils.formatDate(user.reg_time),
		"privilege": privilege[user.privilege] || ""
	}});
};

exports.logout = function* () {

	this.state.extra ={
		redirect: "./login"
	}

	common.succeed.bind(this)();
};

exports.resetPwd = function *() {
	yield* this.render('resetpwd');
};
