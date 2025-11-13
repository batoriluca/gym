// getting-started.js
const mongoose = require('mongoose');

// New Schema (Schema like codes which help to drop the data in db)
// for add user details in db
const UserDetailSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Id-ul de e-mail este necesar"],
        unique: [true, "Acest email există deja"]
    },
    username: {
        type: String,
        required: true,
        unique: [true, "Acest nume de utilizator este deja luat"]
    },
    profilepic: {
        type: String,
        required: true,
        default: 'userprofile.png'
    },
    artistname: {
        type: String,
        required: true,
        default: 'Loading....'
    },
    featurefee: {
        type: String,
        required: true,
        default: 'Loading....'
    },
    description: {
        type: String,
        required: true,
        default: 'Loading....'
    },
    manufacturerpoint: {
        type: Number,
        default: 0
    },
    artistpoint: {
        type: Number,
        default: 0
    },
    verify_code: {
        type: String,
        default: ''
    },
    artistRank: {
        type: Number,
        default: ''
    },
    producerRank: {
        type: Number,
        default: ''
    },
    follows: {
        type: Number,
        default: 0
    },
    followBy: [],
    profile_status: {
        type: String,
        required: true,
        default: 'Pending'
    },
    tasks: {
        postTask: {
            type: Number,
            default: 0
        },
        productTask: {
            type: Number,
            default: 0
        },
    },
    expireAccOn: {
        date: {
            type: String,
            default: ''
        },
        time: {
            type: String,
            default: ''
        },
        allTime: {
            type: String,
            default: ''
        },
    },
    createAccOn: {
        date: {
            type: String,
            default: ''
        },
        time: {
            type: String,
            default: ''
        },
        allTime: {
            type: String,
            default: ''
        },
    }
}, { timestamps: true });

export default mongoose.models.UserDetail || mongoose.model("UserDetail", UserDetailSchema);
