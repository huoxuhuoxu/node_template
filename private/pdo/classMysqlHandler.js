
var mysql = require('mysql');
var mysql_config = require('../../config').mysql;
var connection = mysql.createConnection(mysql_config);

connection.connect();


module.exports = connection;
