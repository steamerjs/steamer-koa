// validate middleware

'use strict';

const Users = require('../model/user').Users;

exports.register = function *(next) {
	this.checkBody('username').notEmpty("邮件不能为空").isEmail("邮件格式不对");
	var result = yield Users.uniqueEmail(this.request.body);
	if (!result) {
		this.errors = this.errors || [];
		this.errors.push({"username": "邮箱已被占用"});
	}

	this.checkBody('password').notEmpty("密码不能为空").len(8, 18, "密码长度为8至18位");
	
	yield next;
};

exports.login = function *(next) {
	this.checkBody('username').notEmpty("邮件不能为空").isEmail("邮件格式不对");
	this.checkBody('password').notEmpty("密码不能为空").len(8, 18, "密码长度为8至18位");
	yield next;
}

exports.changePwd = function *(next) {
	this.checkBody('password').notEmpty("密码不能为空").len(8, 18, "密码长度为8至18位");
	this.checkBody('passwordre').eq(this.request.body.password, "两次密码输入需保持一致");

	yield *next;
};

exports.resetPwd = function *(next) {
	this.checkBody('username').notEmpty("邮件不能为空").isEmail("邮件格式不对");
	yield *next;
}