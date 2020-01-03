const mongoose = require ('mongoose');

const trackSchema = mongoose.Schema({
    title: String,
    link: String,
    artist: {type: mongoose.Schema.Types.ObjectId,
    ref: 'Artist'}
})

const Track = mongoose.model ('Track', trackSchema);

module.exports = Track;