import mongoose, {Schema} from "mongoose";

const productSchema = new Schema({
    name: {
        type: String,
        required: [true, "Please enter product name!"],
        trim: true
    },
    description: {
        type: String,
        required: [true, "Please enter product description!"],
        trim: true
    }, 
    price: {
        type: Number,
        required: [true, "Please enter product price!"],
        min: [0, "Price cannot be negative!"]
    }, 
    stock: {
        type: Number,
        required: [true, "please enter product stock!"],
        min: [0, "Stock cannot be negative!"]
    },
    category: {
        type: String,
        required: [true, "Please enter product category!"],
        trim: true,
        lowercase: true
    },
    image: {
        type: String,
        default: ""
    },
    ratings: {
        type: Number,
        default: 0,
    },
    NumberOfReviews: {
        type: Number,
        default: 0,
    },

}, {timestamps: true});

export const Product = mongoose.model("Product", productSchema);