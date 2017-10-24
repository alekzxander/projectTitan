// set up get all the tools we need

let express = require('express');
let ejs = require('ejs');
let app = express();
var port = process.env.PORT || 8080;
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');


var permissions = require('./config/permissions');
var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var ConnectRoles = require('connect-roles');
var roles = new ConnectRoles()

var configDB = require('./config/database.js');




// configuration 
const nodemailer = require("nodemailer");
mongoose.connect(configDB.url, { useMongoClient: true }); // connection database
mongoose.Promise = global.Promise;

require('./config/passport')(passport); // pass passport for configuration

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs'); // set up ejs for templating
app.use(permissions.middleware());

// required for passport
app.use(session({

    secret: 'ilovescotchscotchyscotchscotch', // session secret
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// routes
require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs')



app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css/'));

app.use(express.static(__dirname + '/public'));

module.exports = app;