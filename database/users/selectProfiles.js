/**
 * Created by Rob on 2/18/2016.
 */
var connectionpool = require('../connection-header.js').getConnection();
var exports = module.exports = {};
exports.getUsers = function(callback) {
    connectionpool.getConnection(function (err, connection) {
        if (err) {
            console.error('CONNECTION error: ', err);
            callback(500);
        } else {
            connection.query('SELECT username, lat, lng, user_profile.user_avatar, status FROM users, user_profile WHERE users.id = user_profile.user_id', function (err, rows) {
                if (err) {
                   callback(500);
                }
                else{
                     callback(rows);
                }
               
                connection.release();
            });
        }
    });
}

exports.getUserByName= function(username, callback){
    connectionpool.getConnection(function (err, connection) {
        if (err) {
            console.error('CONNECTION error: ', err);
            callback(503);
        } else {
            connection.query("SELECT username, lat, lng, user_profile.user_avatar, status FROM users, user_profile WHERE username = ? AND users.id = user_profile.user_id", username, function (err, results) {
                if (err) {
                    console.error(err);
                   callback(500);
                }//If no results, user does not exist
                else if (results.length == 0) {
                    callback(204);
                }
                else{
                    callback(results);
                }
                
                connection.release();
            });
        }
    });
}

exports.getUserByLocation= function(zipArray, callback){
    connectionpool.getConnection(function (err, connection) {
        if (err) {
            console.error('CONNECTION error: ', err);
            callback(503);
        } else {
            connection.query("SELECT username, user_profile.user_avatar, lat, lng, zip, status FROM users, user_profile WHERE users.id = user_profile.user_id AND zip in (?)", 
           [zipArray] , function (err, results) {
                if (err) {
                    console.error(err);
                   callback(500);
                }//If no results, user does not exist
                else if (results.length === 0) {
                    callback(204);
                }
                else{
                    callback(results);
                }
                
                connection.release();
            });
        }
    });
}

exports.getUserCountByLocation= function(zipArray, callback){
    connectionpool.getConnection(function (err, connection) {
        if (err) {
            console.error('CONNECTION error: ', err);
            callback(503);
        } else {
            connection.query("SELECT lat, lng, zip, count(*) as users FROM users WHERE zip in (?) GROUP BY (zip)", 
           [zipArray] , function (err, results) {
                if (err) {
                    console.error(err);
                   callback(500);
                }//If no results, user does not exist
                else if (results.length === 0) {
                    callback(204);
                }
                else{
                  
                    callback(results);
                }
                
                connection.release();
            });
        }
    });
}



