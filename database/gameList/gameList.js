



exports.getGameList= function(username, callback){
    connectionpool.getConnection(function (err, connection) {
        if (err) {
            console.error('CONNECTION error: ', err);
            callback(503);
        } else {
            connection.query("SELECT * FROM owned_games WHERE user_id = (SELECT id FROM users WHERE username=?)", [username], function (err, results) {
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

exports.addGame = function(gameObject, callback){
    connectionpool.getConnection(function (err, connection) {
        if (err) {
                console.log(err);
        } else {
                connection.query('INSERT INTO owned_games SET ?', gameObject, function (err, rows) {
                    if (err) {
                        console.log(err);
                    }
                   else{
                       callback({result: true});
                   }
                    connection.release();
                });
        }

    });

}

exports.editGame = function(gameObject, callback){
    connectionpool.getConnection(function (err, connection) {
        if (err) {
                console.log(err);
        } else {
                connection.query('UPDATE owned_games SET (rating, summary, title) VALUES(?, ?, ?) WHERE id = ?', [gameObject.rating, gameObject.summary, gameObject.title, gameObject.id], function (err, rows) {
                    if (err) {
                        console.log(err);
                    }
                   else{
                       callback({result: true});
                   }
                    connection.release();
                });
        }

    });

}

exports.removeGame = function(gameID, callback){
    connectionpool.getConnection(function (err, connection) {
        if (err) {
                console.log(err);
        } else {
                connection.query('DELETE FROM owned_games WHERE id= ?', [gameID], function (err, rows) {
                    if (err) {
                        console.log(err);
                    }
                   else{
                       callback({result: true});
                   }
                    connection.release();
                });
        }

    });

}