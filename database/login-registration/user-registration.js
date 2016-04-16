/**
 * Created by Rob Nice on 2/17/2016.
 */
var passwordFunctions = require('./password-functions.js');
/**Create connectionpool variable and immediately invoke the getConnection
 * method exported in connection-header.js*/
var connectionpool = require('../connection-header.js').getConnection();
var profileFunctions = require('../users');
/**Create exports variable*/
var exports = module.exports = {};



exports.regUser = function(userObject, callback){
    connectionpool.getConnection(function (err, connection) {
        if (err) {
                console.log(err);
                callback(500);
        } else {
                /**Hash the password before inserting it into the DB*/
                userObject.password = passwordFunctions.hashString(userObject.password).toString();
                connection.query('INSERT INTO users (username, password, email, location_id) VALUES ( ?, ?, ?, (SELECT id FROM locations WHERE zip = ?))', 
                [userObject.username, userObject.password, userObject.email, userObject.zip], function (err, rows) {
                    if (err) {
                        console.log(err);
                       callback(503);
                    }
                   else{
                       profileFunctions.setupProfile({user_id: rows.insertId, user_avatar: userObject.avatar});
                       callback({result:"success"});
                       
                   }
                    connection.release();
                });
        }

    });

}