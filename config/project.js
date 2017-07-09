'use strict';

var config = require('./steamer.config'),
	isProduction = process.env.NODE_ENV === 'production';

if (isProduction) {
	module.exports = {
		host: config.host,
		port: config.port,
		mongo: {
			server: config["mongo-server"],
			port: config["mongo-port"],
			db: config["db"],
		},
		email: {
			from: "xxx@qq.com",
			password: "",
			smtp: "smtp.qq.com"
		},
	};
}
else {
	module.exports = {
		host: config.host,
		port: config.port,
		mongo: {
			server: config["mongo-server"],
			port: config["mongo-port"],
			db: config["db"],
		},
		email: {
			from: "xxx@qq.com",
			password: "",
			smtp: "smtp.qq.com"
		},
	};
}