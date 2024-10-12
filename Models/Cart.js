import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true, // corrected "require" to "required"
    },
    title: {
        type: String,
        required: true, // corrected "require" to "required"
    },
    price: {
        type: Number,
        required: true, // corrected "require" to "required"
    },
    qty: {
        type: Number,
        required: true, // corrected "require" to "required"
    },
    imgSrc: {
        type: String,
        required: true, // corrected "require" to "required"
    },
});

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true, // corrected "require" to "required"
    },
    items: [cartItemSchema],
});

export const Cart = mongoose.model("Cart", cartSchema);
