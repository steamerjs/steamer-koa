const utils = require('../common/utils'),
	  config = require('../../config/project'),
	  Sessions = require('../model/session').Sessions,
	  Email = require('nodemailer'),
	  smtpPool = require('nodemailer-smtp-pool');

var succeed = function() {

	if (this.state.extra && this.state.extra.redirect) {
		this.redirect(this.state.extra.redirect);
		return;
	}

	this.body = {
		ret: 0
	};
};


var fail = function() {
	this.body = {
		ret: this.state.extra.ret,
		msg: this.state.extra.msg
	};
};

exports.succeed = succeed;
exports.fail = fail;

exports.logined = function *() {
	var user = this.state.user;

	if (user) {
		var uid = user._id.toString(),
			pwd = user.password;

		const key = utils.encodeKey(uid, pwd);
        // session
        const session = {
            ip: this.ip,
            ts: utils.getNextDay(),
            key: key
        };
        // 写session
        yield Sessions.upsert(session);
        
        // 写cookie
        const token = utils.encodeToken(uid, key);
        this.cookies.set('SID', token, {signed: false, domain: config.host});

        console.log(config.host, token);
		succeed.bind(this)();
	}
	else {
		fail.bind(this)();
	}	
	
};

var isApi = function(originalUrl) {
	return !!~originalUrl.indexOf("/api/");
}

exports.checkLogin = function *(next) {
	var sid = this.cookies.get('SID'),
		token = utils.decodeToken(sid);

	if (!token || !token.length) {
		if (isApi(this.originalUrl)) {
			this.errors = [{db: "登陆态失效"}];
			yield *next;
		}
		else {
			this.redirect("./login");
			return;
		}
		
	}

	var uid = token[0],
		key = token[1];

	var result = yield Sessions.check(key);

	if (!result || !result.length) {
		if (isApi(this.originalUrl)) {
			this.errors = [{db: "登陆态失效"}];
			yield *next;
		}
		else {
			this.redirect("./login");
			return;
		}
	}

	this.state.sessions = {
		uid,
		key,
	}

	yield *next;
};

exports.respond = function *() {
	if (this.errors) {
		fail.bind(this)();
	}
	else {
		succeed.bind(this)();
	}
};

exports.setSessions = function *(next) {
	var sid = this.cookies.get('SID') || (this.request.body && this.request.body.token) || this.query.token;

	var token = utils.decodeToken(sid);

 	if (!token.length) {
 		return next && (yield* next);
 	}

 	var uid = token[0],
		key = token[1];

	this.state.sessions = {
		uid,
		key,
	}

	yield *next;
};

// clear session and cookie
exports.clearSession = function *(next) {
	var sessions = this.state.sessions || {},
		key = sessions.key;

	// remove session
	yield Sessions.removeByKey(key);

	// remove cookie
    this.cookies.set('SID', null, {domain: config.host, expires: new Date(0)});
    yield *next;
};


exports.sendEmail = function(toEmail, subject, html, text) {
	var protocol = "smtps://" + encodeURIComponent(config.email.from) + ":" + config.email.password + "@" + config.email.smtp;
    var transporter = Email.createTransport(protocol);
    var mailOptions = {
        from: config.email.from, // sender address
        to: toEmail, // list of receivers
        subject: subject, // Subject line
        text: text, // plaintext body
        // html: html // html body
    };
    // console.log(transporter);
    transporter.sendMail(mailOptions, function(err, info) {
    	console.log(err, info);
        if(err) {
        	console.log(err);
            // debug.error('-------------------------');
            // debug.error(error.stack);
            // debug.error('-------------------------');
        } else {
        	console.log(info.response);
            // debug.log('Message sent: ' + info.response);
        }
    });
};

exports.setCORS = function *() {
	const origin = this.headers.origin;
    // debug.log('setCORS origin is %s', origin);
    // if(!origin || !XHR_LIST.has(origin)) return yield* next;
    // this.set({
    //     'Access-Control-Allow-Origin': origin,
    //     'Access-Control-Allow-Methods': 'POST,GET,OPTIONS',
    //     'Access-Control-Allow-Credentials': 'true',
    //     'Access-Control-Allow-Headers': 'origin,content-type',
    //     'Access-Control-Max-Age': '30'
    // });
    // yield* next;
};