// getting-started.js
const mongoose = require('mongoose');

// New Schema (Schema like codes which help to drop the data in db)
// for add Chat details in db
const ChatDetailSchema = new mongoose.Schema({
    chatid: { 
        type: String,
        unique: [true, "ChatId is already exists"] 
    },
    sender: { 
        type: String, 
        required: [true, "Sender username is required"]
    },
    receiver: { 
        type: String, 
        required: [true, "Receiver username is required"]
    },
    seenmessage: {
        sender: {
            type: Boolean,
            default: false
        },
        receiver: {
            type: Boolean,
            default: false
        },
    },
    lastmessage: {
        type: String,
        default: 'Loading...'
    },
    lasttime: {
        type: String,
    },
    lastdate: {
        type: String,
    },
}, { timestamps: true });

export default mongoose.models.ChatDetail || mongoose.model("ChatDetail", ChatDetailSchema);
// export default mongoose.model("ChatDetail", ChatDetailSchema);
