//DEPENDENCIES 
const express = require('express');

//CLASSES
const router = express.Router();

//MODELS
const Artist = require('..models/artist');
const Track = require('../models/track');

//ROUTES
//New route
router.get('/new', async (req, res) => {
    res.render('users/new.ejs');
});

//Create route
router.post('/', async (req,res) => {
    try {
        await Artist.create(req.body);

        res.redirect('/artists');
    } catch (err) {
        res.send(err);
    }
});

//Show route
router.get('/:id', async (req, res) =>{
    try {
        const foundArtist = await Artist.findById(req.params.id);
        
        const artistsTracks = await Track.find({ artist: foundArtist._id });

        res.render('artist/show.ejs', {
            artist:foundArtist,
            tracks: artistsTracks
        });
    } catch (err) {
        res.send(err);
    }
});

//Update route
router.put('/:id', async (req, res) => {
    try {
        await Artist.findByIdAndUpdate(req.params.id, req.body);

        res.redirect(`/artists/${req.params.id}`);
    } catch (err) {
        res.send(err);
    }
});

//Delete route
router.delete('/:id', async (req, res) => {
    try {
        await Artist.findByIdAndRemove(req.params.id);

        await Track.deleteMany({ artist: req.params.id });

        res.redirect('/artists');
    } catch (err) {
        res.send(err);
    }
});

module.exports = router;