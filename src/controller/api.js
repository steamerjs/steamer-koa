const Visit = require('../model/visit');

const {
    formatDate
} = require('../common/utils');

exports.index = async (ctx) => {
    let body = ctx.request.body || {};
    let name = body.name;
    let now = formatDate(Date.now());

    let reuslt = await Visit.add(name, now);

    ctx.body = {
        name,
        now,
        log: reuslt._id
    };
};
