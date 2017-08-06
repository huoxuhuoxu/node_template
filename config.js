
require('dotenv').config();

var database = {
    mysql: {
        'host': process.env.DB_HOST,
        'user': process.env.DB_USERNAME,
        'password': process.env.DB_PASSWORD,
        'database': process.env.DB_DATABASE
    }
};

var port = process.env.PORT;

exports.mysql = database.mysql;
exports.port = port;
