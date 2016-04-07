/**
 * Created by Rob on 2/18/2016.
 * Module used to check for duplicate usernames and emails before inserting them into the database
 * If a duplicate is found, the reponse text should suffice handling the tooltip text for letting the user
 * know what the exact problem is.
 */
var connection = require('../connection-header.js').getConnection();
var loginRegFunctions = require('./user-registration.js');
var exp = module.exports = {};

exp.isDuplicate = function(userObject, callback){
    console.log("Checking for duplicate username " + userObject.username);
    connectionpool.getConnection(function (err, connection) {
        if(err){
            console.error('CONNECTION error: ', err);
            callback(503);
        }
        else{
        connection.query('SELECT username FROM users WHERE username = ?',userObject.username, function (err, results) {
            if (err){
                console.log(err);
                callback(503);
            } 

           else if (results.length > 0) {
               callback({"Error": "Duplicate username"});
            }
            else{
                 console.log("executing registration");
               loginRegFunctions.regUser(userObject, callback);
            }

        });
        }
        connection.release();
       

    });
}

checkEmail = function(userObject, callback){
    connectionpool.getConnection(function (err, connection) {
        if(err){
           callback(503); 
        }
        else{
        console.log(userObject.email);
        connection.query('SELECT username FROM users WHERE email = ?', userObject.email, function (err, results) {
            if (err) {
                console.log(err);
                callback(500);
            }
            else if (results.length > 0) {
                callback({"Error":"Email already registered"});
            }else{
               
            }
                
        });
        }
        connection.release();
    });
}
