var express = require('express');
var mongodb = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var booksRouter = express.Router();

function router (nav) {
    booksRouter.use(function(req, res, next) {
        if (!req.user) {
            res.redirect('/');
        }
        else {
            next();
        }
    });
    booksRouter.route('/')
        .get(function (req, res) {
            var url = 'mongodb://mongo_libraryapp:27017/libraryApp';
            mongodb.connect(url, function (err, db) {
                var collection = db.collection('books');

                collection.find({}).toArray(
                    function (err, results) {
                        res.render('bookListView', {
                            title: 'Books',
                            nav: nav,
                            books: results
                        });
                    });
            });
        });

    booksRouter.route('/:id')
        .get(function (req, res) {
            var id = new ObjectId(req.params.id);
            var url = 'mongodb://mongo_libraryapp:27017/libraryApp';
            mongodb.connect(url, function (err, db) {
                var collection = db.collection('books');

                collection.findOne({_id: id},
                    function (err, results) {
                        res.render('bookView', {
                            title: 'Books',
                            nav: nav,
                            book: results
                        });
                    });
            });
        });

    return booksRouter;
}

module.exports = router;
