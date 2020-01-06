//DEPENDENCIES
const express = require('express');
const bcrypt = require('bcrypt');

//CLASSES
const router = express.Router();

//MODELS
const Track  = require('../models/track');
const Artist = require ('../models/artist');

//ROUTES
//New Route
router.get('/new', async (req, res) => {
    if(req.session.logged = true){
        try {
            const allArtists = await Artist.find();
            res.render('tracks/new.ejs', {
                artists: allArtists
            });
        } catch (err) {
            res.send(err);
        }
    } else {
        res.send('Please Login before using the site')
    }
});

//Create
router.post('/', async (req,res) => {
    if(req.session.logged = true){
        try { 
            await Track.create(req.body);
            res.redirect('/tracks');
        } catch (err) {
            res.send(err);
        }
    } else {
        res.send('Please Login before using the site')
    }
});



//Index
router.get('/', async (req,res) => {
    if(req.session.logged = true){
        try {
            const foundTracks = await Track.find()
            // .populate('artist');
            // console.log(foundTracks);
            res.render('tracks/index.ejs', {
                    tracks:foundTracks
            });
        } catch (err) {
            res.send(err);
        }
    } else {
        res.send('Please Login before using the site')
    }
});

//Show Route
router.get('/:id', async (req, res) => {
    if(req.session.logged = true){
        try {
        const foundTrack = await Track.findById(req.params.id).populate('artist').exec();
        res.render('tracks/show.ejs', {
            track: foundTrack
        });
        } catch (err) {
            res.send(err);
        }
    } else {
        res.send('Please Login before using the site')
    }
});

//EDIT
router.get('/:id/edit', async (req, res) => {
    if(req.session.logged = true){
        try {
                const foundTrack = await Track.findById(req.params.id);
                const allArtists = await Artist.find();
                res.render('tracks/edit.ejs', {
                    track: foundTracks,
                    artists: allArtists,
                });
        } catch (err) {
            res.send(err);
        }
    } else {
        res.send('Please Login before using the site')
    }
});

//UPDATE
router.put('/:id', async (req,res) => {
    if(req.session.logged = true){
        try {
            await Track.findByIdAndUpdate(req.params.id, req.body);
            res.rendirect('/tracks/${req.params.id}');
        } catch (err) {
            res.send (err);
        }
    } else {
        res.send('Please Login before using the site')
    }
});

//DELETE ROUTE
router.delete('/:id', async (req, res) => {
    if(req.session.logged = true){
        try {
            await Track.findByIdAndRemove(req.params.id);
            res.redirect('/tracks');
        } catch (err) {
            res.send (err);
        }
    } else {
        res.send('Please Login before using the site')
    }
});

module.exports = router;