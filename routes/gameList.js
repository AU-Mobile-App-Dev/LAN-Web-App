var gamelist = require('../database/gameList/gameList');
var sessions = require('../database/login-registration');
var errorCodes = require('./error-codes.js');

module.exports = function(app) {
 app.post('/gamelist', function(req, res) {
        sessions.getSession(req.body.session, function(result) {
            if (result) {
                        gamelist.getGameList(req.body.username, function(result) {
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
                    403: "Unauthenticated request"
                });
            }
        });
    });
    
    app.post('/gamelist/add', function(req, res) {
        sessions.getSession(req.body.session, function(result) {
            if (result) {
                 var gameObject ={
                    user_id: req.body.userID,
                    title: req.body.title,
                    summary: req.body.summary,
                    rating: req.body.rating
                }
                        gamelist.addGame(gameObject, function(result) {
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
                    403: "Unauthenticated request"
                });
            }
        });
    });
    
    app.put('/gamelist/edit', function(req, res) {
        sessions.getSession(req.body.session, function(result) {
            if (result) {
                 var gameObject ={
                    id : req.body.id,
                    title: req.body.title,
                    summary: req.body.summary,
                    rating: req.body.rating
                }
                        gamelist.editGame(gameObject, function(result) {
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
                    403: "Unauthenticated request"
                });
            }
        });
    });
    
    app.post('/gamelist/delete', function(req, res) {
        sessions.getSession(req.body.session, function(result) {
            if (result) {
                        gamelist.removeGame(req.body.id, function(result) {
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
                    403: "Unauthenticated request"
                });
            }
        });
    });
    }