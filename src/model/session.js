const db = require('../db/mongo'),
	wrap = require('co-monk'),
	utils = require('../common/utils');

var Sessions = wrap(db.get('sessions'));


// Sessions
Sessions.upsert = function *(session) {

    if(!session.key) {
    	return false;
    }

    var result =  yield Sessions.findAndModify(
    	{
	        "query": { key: session.key },
	        "update": { 
	            "$set": { 
	                "ip": session.ip, 
	                "ts": session.ts,
	            }
	        }
	    },
	    { "new": true, "upsert": true }
    );
    
    return result;
};

Sessions.check = function *(key) {
	if (!key) {
		return false;
	}

	var result = yield Sessions.find({"key": key});

	if (result.length) {
		var ts = result[0].ts,
			key = result[0].key,
			now = Date.now();
		
		if (ts < now) {
			yield Sessions.removeByKey(key)
			return false;
		}

	}
	
	return result;
};

Sessions.removeByKey = function *(key) {
	if (!key) {
		return false;
	}

	var result = yield Sessions.remove({"key": key});

	return result;
};


exports.Sessions = Sessions;
