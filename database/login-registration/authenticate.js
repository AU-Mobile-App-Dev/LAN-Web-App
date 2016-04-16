var passwordFunctions = require('./password-functions.js');
var connectionpool = require('../connection-header.js').getConnection();
var randomstring = require("randomstring");
var setSession = require('./session-functions.js');
/**Create exports variable*/
var exports = module.exports = {};



exports.authenticate = function(userObject, callback){
    connectionpool.getConnection(function (err, connection) {
        console.log("authenticating");
        if (err) {
            console.error('CONNECTION error: ', err);
            callback(500);
        } else {
        
                connection.query("SELECT users.id, users.username, users.password, locations.zip, user_profile.user_avatar FROM users, locations, user_profile WHERE users.username = ? AND users.id = user_profile.user_id AND locations.id = users.location_id", userObject.username, function (err, row) {
                    if (err) {
                        console.log(err);
                    }
                   else if(passwordFunctions.compareStrings(userObject.password, row[0].password)){
                       //Generate session id, insert it to the database and return the response
                       var session = userObject.username + randomstring.generate();
                       session = passwordFunctions.hashString(session).toString();
                       setSession.setSession(session, row[0].id);
                       changeStatus(userObject.username);
                       var resultObject = {result: true, session: session, username: row[0].username, userID: row[0].id, avatar: row[0].user_avatar, zip: row[0].zip};
                       console.log(resultObject);
                       callback(true, resultObject);
                      
                   }
                    else{
                        
                        callback(false, null);
                    }   
                    
                    
                    connection.release();
                });
        }
        
    });
    
   
}

  var changeStatus = function(username){
    connectionpool.getConnection(function (err, connection) {
        if (err) {
           console.log(err);
        } else {
        
                connection.query("UPDATE users SET status = !status WHERE username = ?", username, function (err, row) {
                    if (err) {
                        console.log(err);
                    }
                    else{
                        
                       console.log(row);
                    }   
                    
                    
                    connection.release();
                });
        }
        
    });
    
   
}
