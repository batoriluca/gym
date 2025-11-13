const mongoose = require('mongoose');

// New Schema (Schema like codes which help to drop the data in db)
// for add user in db
const UserSchema = new mongoose.Schema({
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
    password: {
        type: String,
        required: true
    },
    profile_status: {
        type: String,
        required: true,
        default: 'Unverify'
    },
    verify_code: {
        type: String,
        required: true,
    },
    membership: {
        type: String,
        required: true,
        default: 'Deactive'
    },
    token: {
        type: String,
        required: true,
        default: 'Deactive'
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

// mongoose.models = {}
// export default mongoose.model("User", UserSchema);

export default mongoose.models.User || mongoose.model("User", UserSchema);
