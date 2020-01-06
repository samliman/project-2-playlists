// Dependencies 
const express = require('express');
const app = express();
const methodOverride = require('method-override');
const session = require('express-session');
require('./db/db');

const port = 3000;


//Middleware
app.use(session({
    secret: "random secret string",
    resave: false,
    saveUninitialized: false
}));

app.use(express.urlencoded({extended:false}));

app.use(express.static('public'));

app.use(methodOverride('_method'));

//Controllers
const artistsController = require('./controllers/artists');
app.use('/artists', artistsController);

const tracksController = require('./controllers/tracks');
app.use('/tracks', tracksController);

const usersController = require('./controllers/users');
app.use('/auth', usersController);


//Index Route
app.get ('/', (req, res) => {
    res.render('index.ejs', {
        message: req.session.message,
        logged: req.session.logged
    })
});

//Server
app.listen(port, () => {
    console.log(`listening on port ${port}`);
});