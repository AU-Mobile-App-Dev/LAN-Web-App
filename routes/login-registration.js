var loginRegFunctions = require('../database/login-registration');
var errorCodes = require('./error-codes.js');
var geocoder = require('geocoder');

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
            res.json({ result: false, message: 'Authentication failed.' });
        }
    });
});
app.post('/register', function(req, res) {
    geocoder.geocode(req.body.zip, function ( err, data ) {
        if(err){
            console.log(err);
        }
        /**Create object out  of passed params*/
        var userObject = {
            username: req.body.username,
            password: req.body.password,
            lat: data.results[0].geometry.location.lat,
            lng: data.results[0].geometry.location.lng,
            zip: req.body.zip,
            email: req.body.email,
            avatar: req.body.avatar
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
        
});

app.post('/getKey', function(req, res){
    var userObject = {
        username: req.body.username,
        password: req.body.password
    }
    loginRegFunctions.generateKey(userObject, function(result, key){
        console.log(result);
        if(result){
            res.json({ result: true, message: 'Here is your API key, do not lose it or share it', apiKey: key});           
        }
        else{
            res.json({ result: false, message: 'Authentication failed.', apiKey: "" });
        }
    });
    
});

    
}