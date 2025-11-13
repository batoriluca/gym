// getting-started.js
const mongoose = require('mongoose');

// New Schema (Schema like codes which help to drop the data in db)
// for add Chat details in db
const TransactionSchema = new mongoose.Schema({
    transactionid: {
        type: String,
    },
    fromusername: {
        type: String,
    },
    tousername: {
        type: String,
        required: [true, "Seller username is required"]
    },
    amount: {
        type: Number,
    },
    type: {
        type: String,
        default: "add"
    },
    status: {
        type: String,
        default: 'Active'
    },
    remark: {
        type: String,
        default: 'none'
    },
    senttime: {
        type1: {
            type: String
        },
        date: {
            type: String
        },
        time: {
            type: String
        }
    },

}, { timestamps: true });

export default mongoose.models.Transaction || mongoose.model("Transaction", TransactionSchema);
