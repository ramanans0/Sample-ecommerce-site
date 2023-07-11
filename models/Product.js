import {model, models, Schema} from "mongoose";

const ProductSchema = new Schema({
    title: {type: String, required: true},
    stock: Number, 
    price: Number,

    company: String,
    tracking: Number,

    status: String,
});

export const Product = models.Product || model('Product', ProductSchema);
