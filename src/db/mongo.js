let monk = require('monk');
let config = require('../../config/project');
let mongo = config.mongo;

let mongoConfig = null;

if (!mongo.user || !mongo.ps) {
    mongoConfig = mongo.server + ':' + mongo.port + '/' + mongo.db;
}
else {
    mongoConfig = `${mongo.user}:${mongo.ps}@${mongo.server}:${mongo.port}/${mongo.db}`;
}

let mongoInstance = monk(mongoConfig, { authSource: 'admin' });

module.exports = mongoInstance;