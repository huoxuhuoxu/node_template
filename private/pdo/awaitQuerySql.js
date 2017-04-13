
var connection = require('./classMysqlHandler');

const QUERY = function(str){
    return new Promise(function(resolve, reject){
        connection.query(str, function(err, rows, fields){
            if(err){
                console.log(err);
                reject('err');
                return ;
            };
            resolve(rows);
        });
    });
}


exports.QUERY = QUERY;



