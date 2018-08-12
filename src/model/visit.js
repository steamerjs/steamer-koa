const db = require('../db/mongo');

let Visit = db.get('visit');

Visit.add = async function (name, now) {
    try {
        let result = await Visit.insert({
            name,
            now
        });

        return result;
    }
    catch (e) {
        return false;
    }
};

module.exports = Visit;
