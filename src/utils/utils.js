'use strict';

const crypto = require('crypto');

const CIPHER = 'aes256';
const TOKEN_KEY = "uniaccount";

// encode password
exports.encodePwd = function(pwd) {
	return crypto.createHash("RSA-SHA1").update(pwd).digest("hex");
};

// encode str
var encryptStr = function(str, key) {
	const cipher = crypto.createCipher(CIPHER, key);
    return cipher.update(str, 'utf8', 'hex') + cipher.final('hex');
};

// decode str
var decryptStr = function(str, key) {
	const decipher = crypto.createDecipher(CIPHER, key);
    return decipher.update(str, 'hex', 'utf8') + decipher.final('utf8');
};

exports.encodeKey = encryptStr;
exports.decodeKey = decryptStr;

// 将uid|key经过加密因子加密得到token
exports.encodeToken = function(uid, key) {
    const str = uid + '|' + key;
    return encryptStr(str, TOKEN_KEY);
};
// 将加密后的token解密出uid|key
exports.decodeToken = function(token) {
    try {
        token = decryptStr(token, TOKEN_KEY);
        return token.split('|');
    } catch(e) {
        return null;
    }
};


// format date
var formatDate = function(timestamp) {
	var now = new Date(timestamp);
    var year = now.getFullYear(),
        month = now.getMonth() + 1,
        date = now.getDate();

   return year + "-" + month + "-" + date;
};

exports.formatDate = formatDate;

exports.getNextDay = function() {
	let ts = Date.now();
    ts += 3600 * 24 * 1000;
    return ts;
};

exports.generatePwd = function() {
	var str = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@#",
		len = str.length,
		pwdLen = 8,
		pwd = '';

	while (pwdLen) {
		var index = Math.floor(Math.random() * (len));
		pwd += str[index];
		--pwdLen;
	};

	return pwd;
};