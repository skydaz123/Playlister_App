const mongoose = require('mongoose')
const Schema = mongoose.Schema
/*
    This is where we specify the format of the data we're going to put into
    the database.
    
    @author McKilla Gorilla
*/
const playlistSchema = new Schema(
    {
        name: { type: String, required: true },
        ownerEmail: { type: String, required: true },
        userName: { type: String, default: ""},
        songs: { type: [{
            title: String,
            artist: String,
            youTubeId: String
        }], required: true },
        published: { type: Boolean, default: 0},
        likes: { type: Number, default: 0},
        dislikes: { type: Number, default: 0},
        listens: { type: Number, default: 0},
        comments: { type: [{
            userName: String,
            comment: String,
        }], default: []}
    },
    { timestamps: true },
)

module.exports = mongoose.model('Playlist', playlistSchema)
