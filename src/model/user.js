"use strict";

const db = require('../db/mongo'),
	wrap = require('co-monk'),
	utils = require('../common/utils');

var Users = wrap(db.get('users'));

Users.register = function *(user) {
	try {
		var result = yield Users.insert({
								username: user.username, 
								password: utils.encodePwd(user.password), 
								reg_time: Date.now(), 
								privilege: "user"
							});

		return result;
	}
	catch(e) {
		return false;
	}
};

Users.login = function *(user) {
	try {
		var result = yield Users.findOne({username: user.username, password: utils.encodePwd(user.password)});
		if (result) {
			return result;
		}
		return false;
	}
	catch(e) {
		return false;
	}
};

Users.uniqueEmail = function *(user) {
	try {
		var result = yield Users.findOne({username: user.username});
		if (result) {
			return false;
		}
		
		return true;
	}
	catch(e) {
		return false;
	}
};

Users.getById = function *(uid) {
	return yield Users.findOne({"_id": uid});
};

Users.getByUserName = function *(username) {
	return yield Users.findOne({"username": username});
};

Users.changePwd = function *(uid, pwd) {
	return yield Users.update(
	        { _id: uid },
	        { $set: {"password": utils.encodePwd(pwd)} }
	);
};

Users.resetPwd = function *(username, pwd) {
	return yield Users.update(
	        { username: username },
	        { $set: {"password": utils.encodePwd(pwd)} }
	);
};

exports.Users = Users;
