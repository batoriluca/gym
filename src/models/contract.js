// getting-started.js
const mongoose = require('mongoose');

// New Schema (Schema like codes which help to drop the data in db)
// for add Chat details in db
const ContractSchema = new mongoose.Schema({
    contractid: {
        type: String,
    },
    buyer: {
        type: String,
        required: [true, "Buyer username is required"]
    },
    seller: {
        type: String,
        required: [true, "Seller username is required"]
    },
    sellerproduct: {
        type: String,
        required: [true, "Seller Product is required"]
    },
    status: {
        type: String,
        default: 'Waiting'
    },
    productprice: {
        type: Number,
    },
    productfile: {
        type: String,
        default: null
    },
    deadline: {
        type: String,
    },
    delivertime: {
        review: {
            type: String
        },
        rating: {
            type: String
        },
        downloaded: {
            type: Boolean
        },
        time: {
            date: {
                type: String,
            },
            time: {
                type: String,
            },
        },
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
    delivertime: {
        type1: {
            type: String,
            required: [true, "Product Delivery is required"]
        },
        date: {
            type: String,
            required: [true, "Product Delivery is required"]
        },
        time: {
            type: String,
            required: [true, "Product Delivery is required"]
        }
    },

}, { timestamps: true });

export default mongoose.models.Contract || mongoose.model("Contract", ContractSchema);
