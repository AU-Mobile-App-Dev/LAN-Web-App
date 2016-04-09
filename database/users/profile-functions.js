exports.setupProfile = function(profileObject){
    connectionpool.getConnection(function (err, connection) {
        if (err) {
                console.log(err);
        } else {
                connection.query('INSERT INTO user_profile SET ?', profileObject, function (err, rows) {
                    if (err) {
                        console.log(err);
                    }
                   else{
                   }
                    connection.release();
                });
        }

    });

}

exports.editProfile = function(profileObject){
    connectionpool.getConnection(function (err, connection) {
        if (err) {
                console.log(err);
        } else {
                connection.query('UPDATE user_profile SET ? WHERE user_id = ?', [userObject, userObject.id], function (err, rows) {
                    if (err) {
                        console.log(err);
                    }
                   else{
                   }
                    connection.release();
                });
        }

    });

}