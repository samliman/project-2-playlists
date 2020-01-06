const mongoose = require ('mongoose');

const trackSchema = mongoose.Schema({
    title: String,
    link: String,
    image: String,
    artist: {type: mongoose.Schema.Types.ObjectId,
    ref: 'Artist', required: true}
})

const Track = mongoose.model ('Track', trackSchema);

module.exports = Track;