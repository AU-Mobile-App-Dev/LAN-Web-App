var newsfeed = require('../database/newsfeed/newsfeed-functions');
var sessions = require('../database/login-registration');
var errorCodes = require('./error-codes.js');

module.exports = function(app) {
    // ==================================
    // API requests for newsfeed resource 
    // ==================================

    app.get('/api/newsfeed/api=:apikey', function(req, res) {
        sessions.verifyKey(req.params.apikey, function(result) {
            if (result) {
                newsfeed.getNewsFeedByApikey(req.params.apikey, function(result) {
                    errorCodes.responseCodeHandler(result, function(foundError, code) {
                        if (foundError) {
                            res.json(code);
                        } else {
                            res.send(result);
                        }
                    });
                });
            } else {
                res.json({
                    403: "Unauthenticated API request for newsfeed"
                });
            }
        });

    });
    
    app.get('/api/newsfeed/id=:newsItemID/api=:apikey', function(req, res) {
        sessions.verifyKey(req.params.apikey, function(result) {
            if (result) {
                newsfeed.getNewsFeedByID(req.params.newsItemID, function(result) {
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
                    403: "Unauthenticated API request for newsfeed"
                });
            }
        });

    });

    app.post('/api/newsfeed/add/api=:apikey', function(req, res) {
        sessions.verifyKey(req.params.apikey, function(result) {
            if (result) {
                var newsfeedObject = {
                    apikey: req.params.apikey,
                    timestamp: new Date().toISOString().slice(0, 19).replace('T', ' '),
                    message: req.body.message
                }
                newsfeed.addNewsfeedItemByApikey(newsfeedObject, function(result) {
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
                    403: "Unauthenticated API request for newsfeed"
                });
            }
        });
    });
    
    app.delete('/api/newsfeed/delete/:id/api=:apikey', function(req, res) {
        sessions.verifyKey(req.params.apikey, function(result) {
            if (result) {
                var userObject = {
                    apikey: req.params.apikey,
                    newsfeedItemID: req.params.id
                }
                newsfeed.removeNewsfeedItemByApikey(userObject, function(result) {
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
                    403: "Unauthenticated API request for newsfeed"
                });
            }
        });
    });
    

    // =======================
    // POST REQUESTS =========
    // =======================
    app.post('/newsfeed', function(req, res) {
        sessions.getSession(req.body.session, function(result) {
            if (result) {
                newsfeed.getNewsFeedBySession(req.body.session, function(result) {
                    errorCodes.responseCodeHandler(result, function(foundError, code) {
                        if (foundError) {
                            res.json(code);
                        } else {
                            res.send(result);
                        }
                    });
                });
            } else {
                res.json({
                    403: "Unauthenticated API request for newsfeed"
                });
            }
        });

    });

    // =======================
    // PUT REQUESTS =========
    // =======================
    app.put('/newsfeed/add', function(req, res) {
        sessions.getSession(req.body.session, function(result) {
            if (result) {
                 var newsfeedObject = {
                    session: req.body.session,
                    timestamp: new Date().toISOString().slice(0, 19).replace('T', ' '),
                    message: req.body.message
                }
                newsfeed.addNewsfeedItemBySessionkey(newsfeedObject, function(result) {
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
                    403: "Unauthenticated request for friends list"
                });
            }
        });

    });

    // =======================
    // DELETE REQUESTS =======
    // =======================
    app.put('/newsfeed/delete', function(req, res) {
        sessions.getSession(req.body.session, function(result) {
            if (result) {
                var newsfeedObject = {
                    session: req.body.session,
                    newsfeedItemID: req.body.newsfeedID
                }
                newsfeed.removeNewsfeedItemBySession(newsfeedObject, function(result) {
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
                    403: "Unauthenticated API request for newsfeed"
                });
            }
        });
    });



}