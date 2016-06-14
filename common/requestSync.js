var request = require('request');

exports.requestSync = function(uri, option) {
	return function(callback) {
		request(uri, option, function (error, response, body) {
		    	callback(error, response);
		});
	};
} ;