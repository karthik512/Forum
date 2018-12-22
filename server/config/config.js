let env = 'dev';

let config = require(process.cwd() + '/server/config.json');

if(config[env] !== undefined) {
    let envConfig = config[env];

    Object.keys(envConfig).forEach((key) => {
        process.env[key] = envConfig[key];
    });
}