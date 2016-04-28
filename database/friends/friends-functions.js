var connectionpool = require('../connection-header.js').getConnection();
var exports = module.exports = {};

exports.addFriend = function(username, friendName, callback) {
    connectionpool.getConnection(function (err, connection) {
        if (err) {
            console.error('CONNECTION error: ', err);
            callback(500);
        } else {
            connection.query('INSERT INTO friends_list (user_id, friend_id) VALUES ((SELECT id FROM users WHERE username=?), (SELECT id FROM users WHERE username=?));INSERT INTO friends_list (friend_id, user_id) VALUES ((SELECT id FROM users WHERE username=?), (SELECT id FROM users WHERE username=?)) ',
            [username, friendName, username, friendName], function (err, rows) {
                if (err) {
                    console.log(err);
                   callback(true);
                }
                else{
                     callback(201);
                }
               
                connection.release();
            });
        }
    });
}

exports.deleteFriend = function(username, friendName, callback) {
    connectionpool.getConnection(function (err, connection) {
        if (err) {
            console.error('CONNECTION error: ', err);
            callback(500);
        } else {
            connection.query('DELETE FROM friends_list WHERE user_id=(SELECT id FROM users WHERE username=?) AND friend_id=(SELECT id FROM users WHERE username=?);DELETE FROM friends_list WHERE friend_id=(SELECT id FROM users WHERE username=?) AND user_id=(SELECT id FROM users WHERE username=?)',
            [username, friendName, friendName, username], function (err, rows) {
                if (err) {
                   callback(500);
                }
                else{
                     callback(true);
                }
               
                connection.release();
            });
        }
    });
}

exports.getFriendsList= function(userID, callback){
    connectionpool.getConnection(function (err, connection) {
        if (err) {
            console.error('CONNECTION error: ', err);
            callback(503);
        } else {
            connection.query("SELECT username, user_avatar FROM users, friends_list, user_profile WHERE users.id = friends_list.friend_id AND friends_list.friend_id = user_profile.user_id AND friends_list.user_id = ?", [userID], function (err, results) {
                if (err) {
                    console.error(err);
                   callback(500);
                }
                else if(results.length === 0){
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

exports.getFriendIDs= function(userID, callback){
    connectionpool.getConnection(function (err, connection) {
        if (err) {
            console.error('CONNECTION error: ', err);
            callback(503);
        } else {
            connection.query("SELECT friend_id FROM friends_list WHERE friends_list.user_id = ?", [userID], function (err, results) {
                if (err) {
                    console.error(err);
                   callback(500);
                }
                else if(results.length === 0){
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

exports.sendRequest= function(requestObject, callback){
    connectionpool.getConnection(function (err, connection) {
        if (err) {
            console.error('CONNECTION error: ', err);
            callback(503);
        } else {
            connection.query("SELECT * FROM messages WHERE sender = ? AND receiver = ?", 
 [requestObject.sender, requestObject.receiver], function (err, results) {
                if (err) {
                    console.error(err);
                   callback(500);
                }
                else if(results.length > 0){
                      callback(false);
                }else{insertRequest(requestObject, callback);}
                
                connection.release();
            });
        }
    });
}

insertRequest = function(requestObject, callback){
    connectionpool.getConnection(function (err, connection) {
        if (err) {
            console.error('CONNECTION error: ', err);
            callback(503);
        } else {
            connection.query("INSERT INTO `messages` (sender, receiver, message, sent, type) VALUES (?, ?, ?, ?, 0)", 
 [requestObject.sender, requestObject.receiver, requestObject.message, requestObject.timestamp], function (err, results) {
                if (err) {
                    console.error(err);
                   callback(500);
                }
                else if(results.affectedRows > 0){
                      callback(true);
                }else{callback(false);}
                
                connection.release();
            });
        }
    });
}

