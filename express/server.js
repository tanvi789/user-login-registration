'use strict';
const express = require('express');
const session = require('express-session');
const serverless = require('serverless-http');
const crypto = require('crypto');
const bodyParser = require('body-parser');
const nunjucks = require('nunjucks');
const path = require('path');

const app = express();
const router = express.Router();


nunjucks.configure('views', {
    autoescape: true,
    express   : app
});

app.use(session({
    secret: crypto.randomBytes(20).toString("hex"),
    resave: true,
    saveUninitialized: true
}));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,'../','static')));


// router.get('/', (req, res) => {
//     res.writeHead(200, { 'Content-Type': 'text/html' });
//     res.write('<h1>Hello from Express.js!</h1>');
//     res.end();
// });

app.get('/', function(request, response) {
    response.render('index.html');
});

app.get('/register', function(request, response) {
    response.render('register.html');
});

app.get('/home', function(request, response) {
    // Check if user is logged in
    if (request.session.loggedin) {
        // Render home page
        response.render('home.html', { username: request.session.username });
    } else {
        // Redirect to login page
        response.redirect('/');
    }
});

app.get('/logout', function(request, response) {
    // Destroy session data
    request.session.destroy();
    // Redirect to login page
    response.redirect('/');
});

// router.get('/another', (req, res) => res.json({ route: req.originalUrl }));
// router.post('/', (req, res) => res.json({ postBody: req.body }));
//
// app.use(bodyParser.json());
// app.use('/.netlify/functions/server', router);  // path must route to lambda
// app.listen(3000);

module.exports = app;
module.exports.handler = serverless(app);