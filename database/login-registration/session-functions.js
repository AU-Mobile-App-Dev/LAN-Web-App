var passwordFunctions = require('./password-functions.js');
var connectionpool = require('../connection-header.js').getConnection();
/**Create exports variable*/
var exports = module.exports = {};



exports.setSession = function(session, userId){
    connectionpool.getConnection(function (err, connection) {
        if (err) {
            console.error('CONNECTION error: ', err);
            if(err) return false;
        } else {
        
                connection.query("UPDATE users SET session = ? WHERE id= ?", [session, userId], function (err, row) {
                    if (err) {
                        console.log(err);
                    }
                    console.log(row);
                   
                    connection.release();
                });
        }
    });
}

exports.getSession = function(session, callback){
    if(session === null){
        callback(false);
    }
    else{
     connectionpool.getConnection(function (err, connection) {
        if (err) {
            console.error('CONNECTION error: ', err);
        } else {
        
                connection.query("SELECT * from users WHERE session =?", session, function (err, row) {
                    if (err) {
                        console.log(err);
                    }
                    else if(row.length > 0){
                        callback(true);
                    }
                    else{
                        callback(false);
                    }
                   
                    connection.release();
                });
        }
        
    });
    }
}
