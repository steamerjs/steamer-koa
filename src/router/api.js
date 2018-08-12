const Router = require('koa-joi-router');
const Joi = Router.Joi;
const Api = require('../controller/api');

let api = Router();
api.post('/', {
    validate: {
        body: {
            name: Joi.string().max(30),
        },
        type: 'form',
        continueOnError: true
    },
}, Api.index);

module.exports = api;
