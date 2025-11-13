// getting-started.js
const mongoose = require('mongoose');

// New Schema (Schema like codes which help to drop the data in db)
// for add Chat details in db
const ProductSchema = new mongoose.Schema({
    productid: {
        type: String,
    },
    username: {
        type: String,
        required: [true, "Numele de utilizator este necesar"],
        unique: [true, "Acest nume de utilizator este deja luat"]
    },
    prodslug: {
        type: String,
        unique: [true, "Acest produs slug este deja luat."],
        required: [true, "Este necesar un produs Slug"]
    },
    productTitle: {
        type: String,
        required: [true, "Titlul produsului este obligatoriu"]
    },
    productCategory: {
        type: String,
        default: ''
    },
    productPrice: {
        type: String,
        default: ''
    },
    productDescription: {
        type: String,
        default: ''
    },
    image1: {
        type: String,
        default: ''
    },
    image2: {
        type: String,
        default: ''
    },
    video: {
        type: String,
        default: ''
    },
    status: {
        type: String,
    },
    postdate: {
        type: String,
    },
    posttime: {
        type: String,
    }
}, { timestamps: true });

export default mongoose.models.Product || mongoose.model("Product", ProductSchema);
