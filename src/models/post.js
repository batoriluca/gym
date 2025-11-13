// getting-started.js
const mongoose = require('mongoose');

// New Schema (Schema like codes which help to drop the data in db)
// for add Chat details in db
const PostSchema = new mongoose.Schema({
    postid: {
        type: String,
    },
    username: {
        type: String,
        required: [true, "Username is required"],
        unique: [true, "Acest nume de utilizator este deja luat"]
    },
    textcontent: {
        type: String,
    },
    imagecontent: {
        type: String,
        default: ''
    },
    videocontent: {
        type: String,
        default: ''
    },
    status: {
        type: String,
        default: 'Active'
    },
    likes: {
        type: Number,
        default: 0
    },
    likedBy: [],
    postdate: {
        type: String,
    },
    posttime: {
        type: String,
    }
}, { timestamps: true });

export default mongoose.models.Post || mongoose.model("Post", PostSchema);
