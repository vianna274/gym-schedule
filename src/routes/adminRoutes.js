var express = require('express');
var mongodb = require('mongodb').MongoClient;

var adminRouter = express.Router();

var books = [
    {
        Title: 'bla0',
        Genre: 'bla0',
        Author: 'bla0',
        Read: false
    },
    {
        Title: 'bla1',
        Genre: 'bla1',
        Author: 'bla1',
        Read: false
    },
    {
        Title: 'bla2',
        Genre: 'bla2',
        Author: 'bla2',
        Read: false
    },
    {
        Title: 'bla3',
        Genre: 'bla3',
        Author: 'bla3',
        Read: false
    },
];

function router (nav) {
    adminRouter.route('/addBooks')
      .get(function(req, res) {
        var url = 'mongodb://mongo_libraryapp:27017/libraryApp';
        mongodb.connect(url, function (err, db) {
            if (err) {
                console.log(err);
            }
            var collection = db.collection('books');
            collection.insertMany(books, function (err, results) {
                    if (err) {
                        console.log(err);
                    }
                    res.send(results);
                    db.close();
                });
        });
    });

    return adminRouter;
}

module.exports = router;
