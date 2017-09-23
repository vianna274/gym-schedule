var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var session = require('express-session');

var app = express();

var port = process.env.PORT || 3000;

var nav = [{
    Link: '/books',
    Text: 'Books'},
    {
        Link: '/authors',
        Text: 'Authors'
    }];

var booksRouter = require('./src/routes/booksRoutes.js') (nav);
var adminRouter = require('./src/routes/adminRoutes.js') (nav);
var authRouter = require('./src/routes/authRoutes.js') (nav);

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(session({secret: 'library'}));
require('./src/config/passport')(app);

app.set('view engine', 'ejs');

app.set('views', './src/views');

app.use('/books', booksRouter);
app.use('/admin', adminRouter);
app.use('/auth', authRouter);

app.get('/', function (req, res) {
    res.render('index', {
        title: 'Main',
        nav: nav
    });
});

app.listen(port, function (err) {
    console.log('running server on port ' + port);
});

//console.log(app);
