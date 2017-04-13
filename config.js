
database = {
    mysql: {
        'host': 'localhost',
        'user': 'root',
        'password': '',
        'database': ''
    }
}

port = process.env.PORT || '3000';

exports.mysql = database.mysql;
exports.port = port;
