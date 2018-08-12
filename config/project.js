let config = require('./steamer.config');
let isProduction = process.env.NODE_ENV === 'production';

let exportConfig = {};
if (!isProduction) {
    exportConfig = {
        host: config.host,
        port: config.port,
        url: `http://${config.host}:${config.port}`,
        mongo: {
            user: '',
            ps: '',
            server: config['mongo-server'],
            port: config['mongo-port'],
            db: config['mongo-db'],
        }
    };
}
else {
    exportConfig = {
        host: config.host,
        port: config.port,
        url: `http://${config.host}:${config.port}`,
        mongo: {
            user: '',
            ps: '',
            server: config['mongo-server'],
            port: config['mongo-port'],
            db: config['mongo-db'],
        }
    };
}

// 允许接入的跨域应用
exportConfig.apps = {
    // 例子：
    // 'docschina.org': {
    //     name: '印记中文文档平台'
    // },
};

module.exports = exportConfig;