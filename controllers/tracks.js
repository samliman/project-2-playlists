//DEPENDENCIES
const express = require('express');

//CLASSES
const router = express.Router();

//MODELS
const Track  = require('../models/track');
const Artist = require ('../models/artist');

//ROUTES
//New Route
router.get('/new',  (req, res) => {
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
router.post('/',  (req,res) => {
    try { 
        await Track.create(req.body);
        res.redirect('/tracks');
    } catch (err) {
        res.send(err);
    }
});



//Index
router.get('/',  (req,res) => {
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
});

//Show Route
router.get('/:id',  (req, res) => {
    try {
    const foundTrack = await Track.findById(req.params.id).populate('artist').exec();
    res.render('tracks/show.ejs', {
        track: foundTrack
    });
} catch (err) {
    res.send(err);
}
});

//EDIT
router.get('/:id/edit',  (req, res) => {
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
});

//UPDATE
router.put('/:id',  (req,res) => {
    try {
        await Track.findByIdAndUpdate(req.params.id, req.body);
        res.rendirect('/tracks/${req.params.id}');
    } catch (err) {
        res.send (err);
    }
});

//DELETE ROUTE
router.delete('/:id',  (req, res) => {
    try {
        await Track.findByIdAndRemove(req.params.id);
        res.redirect('/tracks');
    } catch (err) {
        res.send (err);
    }
});

module.exports = router;