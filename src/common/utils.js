const crypto = require('crypto');
const request = require('request');

const CIPHER = 'aes256';
const TOKEN_KEY = 'steamer';

// encode password
exports.encodePwd = function(pwd) {
    return crypto.createHash('RSA-SHA1').update(pwd).digest('hex');
};

// encode str
let encryptStr = function(str, key) {
    const cipher = crypto.createCipher(CIPHER, key);
    return cipher.update(str, 'utf8', 'hex') + cipher.final('hex');
};

// decode str
let decryptStr = function(str, key) {
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
    } catch (e) {
        return null;
    }
};


// format date
const formatDate = function(timestamp) {
    let now = new Date(timestamp);
    let year = now.getFullYear(),
        month = now.getMonth() + 1,
        date = now.getDate();

    return year + '-' + month + '-' + date;
};

exports.formatDate = formatDate;

/**
 * request-promise
 * @param {Object} options options for request
 */
const rp = (options) => new Promise((resolve, reject) => {
    request(options, (err, response) => {
        if (err) {
            return reject(err);
        }
        resolve(response);
    });
});