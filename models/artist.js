const mongoose = require('mongoose');

const artistSchema = mongoose.Schema({
    name: String,
});

const Artist = mongoose.model ('Artist', artistSchema);

module.exports = Artist;