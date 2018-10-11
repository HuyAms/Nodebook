import * as _ from 'lodash'

const config = {
  dev: 'development',
  test: 'testing',
  prod: 'production',
  port: process.env.PORT || 8000,
  expireTime: 24 * 60 * 60 * 10, //10 days in second
  secrets: {
    jwt: process.env.JWT || 'huytrinh',
  },
  db: {
    modelPaths: [__dirname + '/../models'],
    dialect: 'postgres'
  },
  env: undefined
};

process.env.NODE_ENV = process.env.NODE_ENV || config.dev;
config.env = process.env.NODE_ENV;

let envConfig;

try {
  envConfig = require('./' + config.env);
  //make sure the require got something back
  envConfig = envConfig || {};
} catch (e) {
  envConfig = {};
}

const apiConfig = _.merge(config, envConfig)

export default apiConfig
