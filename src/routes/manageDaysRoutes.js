var express = require('express');
var mysql = require('mysql');

var manageDaysRouter = express.Router();

var books = [];

var con = mysql.createConnection({
  host: "localhost",
  user: "phpmyadmin",
  password: "leo123",
  database: "phpmyadmin"
});


function router () {
    manageDaysRouter.route('/manageDays')
      .get(function(req, res) {
        con.connect((err) => {
          if (err) throw err;
          console.log('Connected');
          let query = 'INSERT INTO calendar (date, fullTime, halfTime) VALUES ?';
          let values = [
            ['2017-10-30', true, false],
            ['2017-10-31', true, false],
            ['2017-11-01', true, false],
            ['2017-11-02', false, true],
            ['2017-11-03', true, false],
            ['2017-11-04', false, false],
            ['2017-11-05', false, false],
          ];
          con.query(query, [values], (error, results, fields) => {
            if (error) throw error;
            res.send(results);
          });
          //res.send('Connected');
        });
    });

    manageDaysRouter.route('/')
      .get(function(req, res) {
        res.send('Connected');
      });

    return manageDaysRouter;
}

module.exports = router;
