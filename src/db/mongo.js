var monk = require('monk'),
	config = require("../../config/project"),
	mongo = config.mongo;

module.exports = monk(mongo.server + ':' + mongo.port + '/' + mongo.db);