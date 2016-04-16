var connection = require('../connection-header.js').getConnection();


var exp = module.exports = {};

exp.getMessages = function(userID, callback){
     connectionpool.getConnection(function (err, connection) {
        if(err){
            console.error('CONNECTION error: ', err);
            callback(503);
        }
        else{
        connection.query('SELECT messages.id as id, sender, receiver, sent, message, message_type.name, type FROM messages, message_type WHERE messages.type = message_type.id AND messages.receiver = ? ORDER BY sent DESC', [userID]
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

exp.deleteMessage = function(messageID, callback){
     connectionpool.getConnection(function (err, connection) {
        if(err){
            console.error('CONNECTION error: ', err);
            callback(503);
        }
        else{
        connection.query('DELETE FROM messages WHERE id = ?', [messageID]
        , function (err, results) {
            if (err){
                callback(500);
                console.log(err);
                }
            else{callback(201);}

        });
        }
        connection.release();
      
    });   
}

