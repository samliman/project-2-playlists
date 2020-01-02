const express = require('express');
const router = express.Router();

const Track  = require('../models/track.js');
const Artist = require ('../models/track.js');

//New Route
router.get('/new', async (req, res) => {
    try {
        const allArtists = await Artist.find();

        res.render('tracks/new.ejs', {
            artists: allArtists
        });
    } catch (err) {
        res.send(err);
    }
});

//Create
router.post('/', async (req,res) => {
    try { 
        await Track.create(req.body);

        res.redirect('/tracks');
    } catch (err) {
        res.send(err);
    }
});

//Index
router.get('/', async, (req,res) => {
    try {
        const foundTrack = await Track.findById(req.params.id).populate('artist');
        res.render('tracks/show.ejs', {
                tracks:foundTrack
        });
    } catch (err) {
        res.send(err);
    }
});
