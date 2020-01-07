// Dependencies 
require('dotenv').config();
const express = require('express');
const app = express();
const methodOverride = require('method-override');
const session = require('express-session');
require('./db/db');
const bcrypt = require('bcrypt');

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

const seedController = require('./controllers/seed');
app.use('/seed', seedController);


//Index Route
app.get ('/', (req, res) => {
    res.render('index.ejs', {
        message: req.session.message,
        logged: req.session.logged
    })
    // res.render('index.ejs');
});

//Server
app.listen(port, () => {
    console.log(`listening on port ${port}`);
});

app.listen(process.env.PORT, () => {
    console.log('listening on port 3000');
  })