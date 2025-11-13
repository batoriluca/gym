// getting-started.js
const mongoose = require('mongoose');

// New Schema (Schema like codes which help to drop the data in db)
// for add Chat details in db
const ChatsSchema = new mongoose.Schema({
    chatid: { 
        type: String,
    },
    username: { 
        type: String, 
        required: [true, "Username is required"]
    },
    message: { 
        type: String,
    },
    type: { 
        type: String,
        default: 'msg'
    },
    seenmessage: {
        receiver: {
            type: String,
            default: 'unseen'
        },
    },
    sentdate:{
        type: String,
    },
    senttime:{
        type: String,
    }
}, { timestamps: true });

export default mongoose.models.Chats || mongoose.model("Chats", ChatsSchema);
