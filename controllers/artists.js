//DEPENDENCIES 
const express = require('express');
const bcrypt = require('bcrypt');

//CLASSES
const router = express.Router();

//MODELS
const Artist = require('../models/artist');
const Track = require('../models/track');

//ROUTES
//New route
router.get('/new', async (req, res) => { 
    if(req.session.logged = true){ 
        res.render('artists/new.ejs');
    } else {
        res.send('Please Login before using the site')
    }
});

//Create route
router.post('/', async (req,res) => {
    if(req.session.logged = true){
        try {
        await Artist.create(req.body);
        res.redirect('/artists');
        } catch (err) {
            res.send(err);
        }
    } else {
    res.send('Please Login before using the site')
    }
});

//Index Route
router.get('/', async (req, res) => {
if(req.session.logged = true){
    try {
        const foundArtists = await Artist.find();
        res.render('artists/index.ejs', {
            artists: foundArtists
        });
        } catch (err) {
        res.send(err);
        }
    } else {
        res.send('Please Login before using the site')
    }
});

//Show route
router.get('/:id', async (req, res) =>{
    if(req.session.logged = true){
        try {
            const foundArtist = await Artist.findById(req.params.id);
            const artistsTracks = await Track.find({ artist: foundArtist._id });
            res.render('artists/show.ejs', {
                artist:foundArtist,
                tracks: artistsTracks
            });
        } catch (err) {
            res.send(err);
        }
    } else {
        res.send('Please Login before using the site')
    }
});

router.get('/:id/edit', async (req, res) => {
    if(req.session.logged = true){
        try {
                const foundArtist = await Artist.findById(req.params.id);
                res,render('artists/edit.ejs', {
                artist: foundArtist
                });
            } catch (err) {
                res.send(err);
            }
    } else {
        res.send('Please Login before using the site')
    }
});

//Update route
router.put('/:id', async (req, res) => {
    if(req.session.logged = true){
        try {
            await Artist.findByIdAndUpdate(req.params.id, req.body);

            res.redirect(`/artists/${req.params.id}`);
        } catch (err) {
            res.send(err);
        }
    } else {
        res.send('Please Login before using the site')
    }   
});

//Delete route
router.delete('/:id', async (req, res) => {
    if(req.session.logged = true){
        try {
            await Artist.findByIdAndRemove(req.params.id);

            await Track.deleteMany({ artist: req.params.id });

            res.redirect('/artists');
        } catch (err) {
            res.send(err);
        }
    } else {
        res.send('Please Login before using the site')
    }   
});

module.exports = router;