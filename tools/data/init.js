/**
 * mongodb 数据初始化
 */
"use strict";

const db = require('../../src/db/mongo');

let Log = db.get('log');

async function addLog() {
  	let result = await Log.insert({
		  now : Date.now(),
	}); 
	
	console.log(result);
}

addLog();


