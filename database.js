// Configuration Keys
const { DATABASE } = require('./configuration/config');

const mysql = require('mysql2');
const db = mysql.createConnection(DATABASE.uri);

/************
 * @Exports *
 ************/

// DB Connection
module.exports = db;
