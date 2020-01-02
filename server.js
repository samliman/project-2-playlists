// Dependencies 
const express = require('express');
const app = express();
const methodOverride = require('method-override');
const session = require('express-session');
require('./db/db.js');

const port = 3000;


//Middleware
app.use(express.urlencoded({extended:false}));
app.use(methodOverride('_method'));
app.use(express.static('public'));

//Controllers
const artistsController = require('./controllers/artist.js/index.js');
// app.use('/artists', artistsController);
const tracksController = require('./controllers/track.js/index.js');
// app.use('/tracks', tracksController);


app.get ('/', (req, res) => {
    res.render('index.ejs');
});

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});