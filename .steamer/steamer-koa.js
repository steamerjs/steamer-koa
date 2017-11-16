module.exports = {
    'files': [
        'src',
        'tools',
        'README.md',
        '.eslintrc.js'
    ],
    options: [
        {
            type: 'input',
            name: 'host',
            message: 'server host(steamer.com)',
            default: "steamer.com",
        },
        {
            type: 'input',
            name: 'port',
            message: 'server port(3001)',
            default: "3001",
        },
        {
            type: 'input',
            name: 'mongo-server',
            message: 'mongo server(127.0.0.1)',
            default: "127.0.0.1",
        },
        {
            type: 'input',
            name: 'mongo-port',
            message: 'mongo server port(27017)',
            default: "27017",
        },
        {
            type: 'input',
            name: 'mongo-db',
            message: 'mongo server db(steamer)',
            default: 'steamer'
        }
    ]
};