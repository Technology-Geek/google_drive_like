/*****************
 * @Dependencies *
 *****************/

//Environment Variable Manager
const dotenv = require('dotenv');

/***************************
 * @InitializeDependencies *
 ***************************/

//Initialize dotenv with configuration file path
dotenv.config({ path: 'configuration/.env' });

console.log('********************* Environment Ready *********************');

/***********************
 * @ConfigurationSetUp *
 ***********************/
const databaseDefault = {
  host: 'localhost',
  username: 'root',
  password: '',
  dbName: 'mydb',
};

//Configuration Object
const config = {
  DATABASE: {
    engin: 'mysql',
    host: process.env.MySqlHost || databaseDefault.host,
    username: process.env.MySqlUsername || databaseDefault.username,
    password: process.env.MySqlPassword || databaseDefault.password,
    dbName: process.env.MySqlDbName || databaseDefault.dbName,
    uri: `mysql://${process.env.MySqlUsername || databaseDefault.username}:${
      process.env.MySqlPassword || databaseDefault.password
    }@${process.env.MySqlHost || databaseDefault.host}/${
      process.env.MySqlDbName || databaseDefault.dbName
    }`,
  },
  PORT: process.env.PORT || 7000,
};

/************
 * @Exports *
 ************/

//Configuration Object
module.exports = config;
