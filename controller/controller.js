"use strict";

var data = require('../model/model');
var hw = require('../model/db');
var requestSync = require('../common/requestSync').requestSync;
var htmlparser = require("htmlparser");
var htmlToText = require('html-to-text');

exports.index = function* () {
    yield* this.render('index', {content: 'hey man!'});
};

// exports.create = function* () {
// 	yield hw.insert({
// 		id: 1,
// 		content: "heyman"
// 	});
// 	this.body = "success";
// };

// exports.list = function* () {
// 	var id = this.query.id;
// 	var numPerPage = 5;
// 	var blogList = data.blogList;

// 	if (id) {
// 		blogList = blogList.slice((id - 1) * numPerPage, numPerPage * id);
// 	}

// 	this.set('Access-Control-Allow-Origin', 'http://localhost:8008');
// 	// this.set('Access-Control-Allow-Origin', 'http://localhost:9000');
// 	this.set('Access-Control-Allow-Credentials', true);
// 	this.body = {
// 		retcode: 0,
// 		data: blogList
// 	};
// };

// exports.detail = function* () {
// 	var blogDetail = data.blogDetail;
// 	var id = this.query.id;
// 	var blog = {};

// 	for (let item of blogDetail) {
// 		if (item.id == parseInt(id)) {
// 			blog = item;
// 			break;
// 		}
// 	}

// 	this.set('Access-Control-Allow-Origin', 'http://localhost:8008');
// 	// this.set('Access-Control-Allow-Origin', 'http://localhost:9000');
// 	this.set('Access-Control-Allow-Credentials', true);
// 	this.body = {
// 		retcode: 0,
// 		data: blog
// 	};
// };

exports.detail = function* () {

	var res = yield requestSync(this.request.body.url, {});

	var text = htmlToText.fromString(res.body, {
	    ignoreImage: false,
	    ignoreHref: false,
	});

	this.set('Access-Control-Allow-Origin', 'http://localhost:9000');
	this.set('Access-Control-Allow-Credentials', true);
	
	this.body = {
		ret: 0,
		content: text
	};
};