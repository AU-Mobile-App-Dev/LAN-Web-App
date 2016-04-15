var profiles = require('../database/users');
var sessions = require('../database/login-registration');
var errorCodes = require('./error-codes.js');
var zipcodes = require('zipcodes');

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

    app.get('/api/users/username/:username/api=:apikey', function(req, res) {
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
   
    app.get('/api/users/location/:zip/api=:apikey', function(req, res) {
        sessions.verifyKey(req.params.apikey, function(result) {
            if (result) {
                var zipcodeArray = zipcodes.radius(req.params.zip,15);
                        profiles.getUserByLocation(zipcodeArray, function(result) {
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
    
    app.get('/api/users/location/:zip/:radius/api=:apikey', function(req, res) {
        sessions.verifyKey(req.params.apikey, function(result) {
            if (result) {
                var zipcodeArray = zipcodes.radius(req.params.zip,req.params.radius);
                        profiles.getUserByLocation(zipcodeArray, function(result) {
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
    // POST REQUESTS =========
    // =======================
    app.post('/users/location', function(req, res) {
        sessions.getSession(req.body.session, function(result) {
            if (result) {
                        profiles.getUserByLocation(req.body.zip, function(result) {
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
    
    app.post('/users/username', function(req, res) {
        sessions.getSession(req.body.session, function(result) {
            if (result) {
                        profiles.getUserByName(req.body.username, function(result) {
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
    
     app.post('/users/location/count', function(req, res) {
        sessions.getSession(req.body.session, function(result) {
            if (result) {
                        var zipcodeArray = zipcodes.radius(req.body.zip, 15);
                        profiles.getUserCountByLocation(zipcodeArray, function(result) {
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
    // POST REQUESTS =========
    // =======================
    
    // =======================
    // PUT REQUESTS ==========
    // =======================
   
        
    // =======================
    // DELETE REQUESTS =======
    // =======================
    


}