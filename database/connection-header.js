/**
 * Created by Rob on 2/18/2016.
 */
var exports = module.exports = {};
/*
 exports.getConnection = function() {
 mysql = require('mysql'),
 connectionpool = mysql.createPool({
 host: process.env.DBURL,
 user: process.env.DBUSER,
 password: process.env.DBKEY,
 database: 'heroku_4656e4fcc59f649'
 });
 return connectionpool;
 }
 */

exports.getConnection = function() {
    mysql = require('mysql'),
        connectionpool = mysql.createPool({
            host: 'bqmayq5x95g1sgr9.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
            user: 'fdntv91ti4crjd1q',
            password: 'watj5tbbt1d565gg',
            database: 'xr0ghe754iux3n0g',
            multipleStatements: true
        });
    return connectionpool;
}
