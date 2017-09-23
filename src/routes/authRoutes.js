var express = require('express');
var mongodb = require('mongodb').MongoClient;
var passport = require('passport');
var authRouter = express.Router();

function router (nav) {
    authRouter.route('/signIn')
        .post(passport.authenticate('local', {
            failureRedirect: '/'
        }), function (req, res) {
            res.redirect('/auth/profile');
        });

    authRouter.route('/signUp')
      .post(function (req, res) {
            console.log(req.body);
            var url = 'mongodb://mongo_libraryapp:27017/libraryApp';
            mongodb.connect(url, function (err, db) {
                var collection = db.collection('users');
                var newUser = {
                    username: req.body.userName,
                    password: req.body.password
                };
                _signUp(req, res, newUser, collection);
            });
        });
    authRouter.route('/profile')
        .all(function(req, res, next) {
            if (!req.user) {
                res.redirect('/');
            }
            next();
        })
        .get(function(req, res) {
            res.json(req.user);
        });
    authRouter.route('/alreadyRegistered')
        .get(function(req, res) {
            res.send('User already registered');
        });
    return authRouter;
}

function _signUp(req, res, newUser, collection) {
    collection.findOne({username: req.body.userName}, function (err, results) {
        if (results) {
            res.redirect('/auth/alreadyRegistered');
        }
        else {
            collection.insert(newUser, function (err, results) {
                req.login(results.ops[0], function () {
                    res.redirect('/auth/profile');
                });
            });
        }
    });
}

module.exports = router;
