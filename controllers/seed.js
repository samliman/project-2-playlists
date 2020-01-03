//DEPENDENCIES
const express = require('express');

// CLASSES
const router = express.Router();

//MODELS
const Artist = require('../models/artist');
const Track = require('../models/track')

//ARTISTS SEED ARRAY
const artistsToSeed = [
    {
        name: 'Flying Lotus'
    },
    {
        name: 'FaltyDL'
    },
    {
        name: 'Ben UFO'
    },
    {
        name: 'Objekt'
    },
    {
        name: 'Simo Cell'
    },
    {
        name: 'Peverelist'
    },
    {
        name: 'DjRUM'
    },
    {
        name: 'John Talabot'
    },
    {
        name: 'Four Tet'
    },
    {
        name: 'Max Cooper'
    }
];

//ROUTES
router.get('/', async (req, res) => {
    try {
// seed CREATE route and CLEAR EXISTING DATA
        await Artist.collection.drop();
        await Track.collection.drop();
            
            const newArtists = await Artist.create(artistsToSeed);
            const tracksToSeed =  [
            {
                title: 'Daughter',
                link: 'https://www.youtube.com/watch?v=oucTu-2SmZs',
                artist: newArtists[8]._id
            },
        {
            title: 'Drugs (feat Rosie Lowe)',
            link: 'https://www.youtube.com/watch?v=K3Gk8Ku662A',
            artist: newArtists[1]._id
        },
            {
                title: 'Stop The Killing',
                link: 'https://www.youtube.com/watch?time_continue=37&v=uxoZZIk0wqY&feature=emb_title',
                artist: newArtists[4]._id
            }
        ]

        await Track.create(tracksToSeed);
        const tracksAndArtists = await Track.find().populate('artist').exec();
        res.json(trackAndArtists);
        } catch (err) {
            res.send(err);
        }
})

module.exports = router;