// getting-started.js
const mongoose = require('mongoose');

// New Schema (Schema like codes which help to drop the data in db)
// for add Chat details in db
const NotificationSchema = new mongoose.Schema({
    notifid: { 
        type: String,
        unique: [true, "Notification is already exists"] 
    },
    forUser: { 
        type: String, 
        required: [true, "forUser is required"]
    },
    byUser: { 
        type: String,
    },
    message: {
        type: String,
        default: 'Loading...'
    },
    type: {
        type: String,
        default: 'all'
    },
    link: {
        type: String,
        default: ''
    },
    lasttime: {
        type: String,
    },
    lastdate: {
        type: String,
    },
}, { timestamps: true });

export default mongoose.models.Notification || mongoose.model("Notification", NotificationSchema);