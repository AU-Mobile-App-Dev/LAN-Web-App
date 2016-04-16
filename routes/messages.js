var messages = require('../database/messages/message-functions');
var sessions = require('../database/login-registration');
var errorCodes = require('./error-codes.js');


module.exports = function(app) {
    // ===============================
    // API REQUESTS for Users resource 
    // ===============================

    app.get('/api/messages/api=:apikey', function(req, res) {
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

 
    // =======================
    // POST REQUESTS =========
    // =======================
    app.post('/messages/get', function(req, res) {
        sessions.getSession(req.body.session, function(result) {
            if (result) {
                        messages.getMessages(req.body.userID, function(result) {
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
    
     app.post('/messages/delete', function(req, res) {
        sessions.getSession(req.body.session, function(result) {
            if (result) {
                        messages.deleteMessage(req.body.messageID, function(result) {
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
    
   


}