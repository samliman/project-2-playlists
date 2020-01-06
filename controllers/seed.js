//DEPENDENCIES
const express = require('express');
const bcrypt =  require('bcrypt');

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
//Seed Index
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
                image: 'https://i.scdn.co/image/f96458025a0640bf1d3c8f764a42ec21d4db1eae',
                artist: newArtists[8]._id
            },
        {
            title: 'Drugs (feat Rosie Lowe)',
            link: 'https://www.youtube.com/watch?v=K3Gk8Ku662A',
            image: 'https://i1.sndcdn.com/artworks-000174845332-zhu5an-t500x500.jpg',
            artist: newArtists[1]._id
        },
            {
                title: 'Away From Keyboard',
                link: 'https://www.youtube.com/watch?v=pSC2EPDKGCQ',
                image: 'https://i1.sndcdn.com/artworks-000191915927-7jtpm9-t500x500.jpg',
                artist: newArtists[4]._id
            }
        ]

        await Track.create(tracksToSeed);
        const tracksAndArtists = await Track.find().populate('artist').exec();

        res.json(tracksAndArtists);

        } catch (err) {
            res.send(err);
        }
})

module.exports = router;