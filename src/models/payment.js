// getting-started.js
const mongoose = require('mongoose');

// New Schema (Schema like codes which help to drop the data in db)
// for add Chat details in db
const PaymentSchema = new mongoose.Schema({
    paymentid: {
        type: String,
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
    postdate: {
        type: String,
    },
    posttime: {
        type: String,
    }
}, { timestamps: true });

export default mongoose.models.Payment || mongoose.model("Payment", PaymentSchema);
