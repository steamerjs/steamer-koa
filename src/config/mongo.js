var monk = require('monk'),
	config = require("../../tools/config"),
	mongo = config.mongo;

module.exports = monk(mongo.server + ':' + mongo.port + '/' + mongo.db);