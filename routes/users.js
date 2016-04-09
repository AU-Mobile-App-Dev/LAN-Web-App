var profiles = require('../database/users');
var sessions = require('../database/login-registration');
var errorCodes = require('./error-codes.js');

module.exports = function(app) {
    // ===============================
    // API REQUESTS for Users resource 
    // ===============================

    app.get('/api/users/api=:apikey', function(req, res) {
        sessions.verifyKey(req.params.apikey, function(result) {
            if (result) {
                profiles.getAllUsers(function(result) {
                    errorCodes.responseCodeHandler(result, function(foundError, code) {
                        if (foundError) {
                            res.json(code);
                        } else {
                            res.json(result);
                        }
                    });
                });
            } else {
                res.json({
                    403: "Unauthenticated API request for friends list"
                });
            }
        });

    });

    app.get('/api/users/:username/api=:apikey', function(req, res) {
        sessions.verifyKey(req.params.apikey, function(result) {
            if (result) {
                profiles.getUserByName(req.params.username, function(result) {
                    errorCodes.responseCodeHandler(result, function(foundError, code) {
                        if (foundError) {
                            res.json(code);
                        } else {
                            res.json(result);
                        }
                    });
                });
            } else {
                res.json({
                    403: "Unauthenticated API request for friends list"
                });
            }
        });
    });
   
    app.get('/api/users/:zip/api=:apikey', function(req, res) {
        sessions.verifyKey(req.params.apikey, function(result) {
            if (result) {
                        profiles.getUserByLocation(req.params.zip, function(result) {
                            errorCodes.responseCodeHandler(result, function(foundError, code) {
                                if (foundError) {
                                    res.json(code);
                                } else {
                                    res.json(result);
                                }
                            })
                        });
                    
            } else {
                res.json({
                    403: "Unauthenticated API request for friends list"
                });
            }
        });
    });

    

    // =======================
    // GET REQUESTS =========
    // =======================

    // =======================
    // POST REQUESTS =========
    // =======================
    
    // =======================
    // PUT REQUESTS ==========
    // =======================
   
        
    // =======================
    // DELETE REQUESTS =======
    // =======================
    


}