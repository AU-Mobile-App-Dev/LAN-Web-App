var loginRegFunctions = require('../database/login-registration');
var errorCodes = require('./error-codes.js');

module.exports = function(app){
// =======================
// POST REQUESTS =========
// =======================   
app.post('/sessions/verify', function(req, res){
    loginRegFunctions.getSession(req.body.session, function(result){
        if(result){
            res.json({ result: "success"});           
        }
        else{
            res.json({result: "failed", message: 'Authentication failed.' });
        }
    });
});

app.post('/sessions/destroy', function(req, res){
    loginRegFunctions.destroySession(req.body.userID, function(result){
        if(result){
            res.json({ result: "success"});           
        }
        else{
            res.json({result: "failed", message: 'Authentication failed.' });
        }
    });
});

    
}