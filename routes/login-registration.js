var loginRegFunctions = require('../database/login-registration');
var errorCodes = require('./error-codes.js');

module.exports = function(app){
// =======================
// POST REQUESTS =========
// =======================   
app.post('/authenticate', function(req, res){
    var userObject = {
        username: req.body.username,
        password: req.body.password
    }
    loginRegFunctions.authenticate(userObject, function(result, resultObject){
        if(result){
            res.json(resultObject);           
        }
        else{
            res.json({ result: "failed", message: 'Authentication failed.' });
        }
    });
});
app.post('/register', function(req, res) {
        /**Create object out  of passed params*/
        var userObject = {
            username: req.body.username,
            password: req.body.password,
            zip: req.body.zip,
            email: req.body.email
        };
        // ============================
        // Check for duplicate usernames
        // ============================
        loginRegFunctions.checkDups(userObject, function(result){
            errorCodes.responseCodeHandler(result, function(foundError, code){
                  if(foundError){
                      res.json(code);
                  }
                  else{
                      res.json(result);
                    }
              });
        });
});

app.post('/users/getKey', function(req, res){
    var userObject = {
        username: req.body.username,
        password: req.body.password
    }
    loginRegFunctions.generateKey(userObject, function(result, key){
        console.log(result);
        if(result){
            res.json({ success: true, message: 'Here is your API key, do not lose it or share it', apiKey: key});           
        }
        else{
            res.json({ success: false, message: 'Authentication failed.' });
        }
    });
    
});

    
}