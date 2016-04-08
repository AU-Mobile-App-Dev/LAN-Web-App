var connection = require('../connection-header.js').getConnection();
var randomstring = require('randomstring');
var passwordFunctions = require('./password-functions.js');

var exp = module.exports = {};

exp.getNewsFeedBySession = function(session, callback){
     connectionpool.getConnection(function (err, connection) {
        if(err){
            console.error('CONNECTION error: ', err);
            callback(503);
        }
        else{
        connection.query('SELECT newsfeed.id, user_id, username, timestamp, message, likes FROM newsfeed, users WHERE user_id=(SELECT id FROM users WHERE session = ?) AND users.session = ? ORDER BY timestamp DESC', [session, session]
        , function (err, results) {
            if (err){
                callback(500);
                console.log(err);
                }
             else if(results.length === 0){
                callback(204);
            }
            else{callback(results);}

        });
        }
        connection.release();
      
    });   
}

exp.getNewsFeedByApikey = function(apikey, callback){
     connectionpool.getConnection(function (err, connection) {
        if(err){
            console.error('CONNECTION error: ', err);
            callback(503);
        }
        else{
            apikey = passwordFunctions.hashString(apikey).toString();
        connection.query('SELECT * FROM newsfeed WHERE user_id=(SELECT id FROM users WHERE api_key = ?)', apikey
        , function (err, result) {
            if (err){callback(500)}
            else if(result.length === 0){
                callback(204);
            }
            else{callback(result);}

        });
        }
        connection.release();
      
    });   
}


exp.getNewsFeedByID = function(username, callback){
     connectionpool.getConnection(function (err, connection) {
        if(err){
            console.error('CONNECTION error: ', err);
            callback(503);
        }
        else{
        connection.query('SELECT * FROM newsfeed WHERE user_id=(SELECT id FROM users WHERE username = ?)', username
        , function (err, result) {
            if (err){callback(500)}
             else if(result.length === 0){
                callback(204);
            }
            else{callback(result);}

        });
        }
        connection.release();
      
    });   
}

exp.addNewsfeedItemByApikey = function(newsObject, callback){
     connectionpool.getConnection(function (err, connection) {
        if(err){
           callback(503);
        }
        else{
        var genKey = randomstring.generate(6);
         var apikey = passwordFunctions.hashString(newsObject.apikey).toString();
         console.log(genKey);
        connection.query('INSERT INTO newsfeed (id, user_id, timestamp, message) VALUES (?, (SELECT id FROM users WHERE api_key = ?), ?, ?)',
        [genKey, apikey, newsObject.timestamp, newsObject.message], function (err, results) {
            if (err){ callback(500);
                console.log(err);
            }
            else{
                callback(201);
            }
        });
        }
        connection.release();
        

    });   
}

exp.addNewsfeedItemBySessionkey = function(newsObject, callback){
     connectionpool.getConnection(function (err, connection) {
        if(err){
            callback(503);
        }
        else{
            var genKey = randomstring.generate(6);
        connection.query('INSERT INTO newsfeed (id, user_id, timestamp, message) VALUES (?, (SELECT id FROM users WHERE session = ?), ?, ?)',
        [genKey, newsObject.session, newsObject.timestamp, newsObject.message], function (err, results) {
            if (err){ callback(500);}
            else{
                console.log(results);
                callback(201);
            }
        });
        }
        connection.release();
       

    });   
}

exp.removeNewsfeedItemByApikey = function(userObject, callback){
     connectionpool.getConnection(function (err, connection) {
        if(err){
           callback(503);
        }
        else{
            userObject.apikey = passwordFunctions.hashString(userObject.apikey).toString();
        connection.query('DELETE FROM newsfeed WHERE id = ? AND user_id = (SELECT id FROM users WHERE api_key = ?)',
        [userObject.newsfeedItemID, userObject.apikey], function (err, results) {
            if (err) {callback(500);}
            else if(results.affectedRows === 0){
                callback(204);
            }
            else{
                callback(201);
            }
        });
        }
        connection.release();
       

    });   
}

exp.removeNewsfeedItemBySession = function(newsfeedObject, callback){
     connectionpool.getConnection(function (err, connection) {
        if(err){
           callback(503);
        }
        else{
        connection.query('DELETE FROM newsfeed WHERE id = ? AND user_id = (SELECT id FROM users WHERE session = ?)',
        [newsfeedObject.newsfeedItemID, newsfeedObject.session], function (err, results) {
            if (err) {callback(500);}
            else if(results.affectedRows === 0){
                callback(204);
            }
            else{
                callback(201);
            }
        });
        }
        connection.release();
       

    });   
}