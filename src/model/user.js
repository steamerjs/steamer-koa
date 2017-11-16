const db = require('../db/mongo'),
    utils = require('../common/utils');

let Users = db.get('users');

Users.register = async function (user) {
    try {
        let result = await Users.insert({
            username: user.username,
            password: utils.encodePwd(user.password),
            reg_time: Date.now(),
            privilege: 'user'
        });

        return result;
    }
    catch (e) {
        return false;
    }
};

exports.Users = Users;
