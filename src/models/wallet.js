// getting-started.js
const mongoose = require('mongoose');

// New Schema (Schema like codes which help to drop the data in db)
// for add Chat details in db
const WalletSchema = new mongoose.Schema({
    walletid: {
        type: String,
    },
    username: {
        type: String,
        required: [true, "Numele de utilizator este necesar"],
        unique: [true, "Acest nume de utilizator este deja luat"]
    },
    amount: {
        type: Number,
    },
    lockamount: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        default: 'Active'
    },
    stripecsID: {
        type: String,
        default: ''
    },
    stripePaymentID: {
        type: String,
        default: ''
    },
    updatedate: {
        type: String
    },
    updatetime: {
        type: String
    }


}, { timestamps: true });

export default mongoose.models.Wallet || mongoose.model("Wallet", WalletSchema);
