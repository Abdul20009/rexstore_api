const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    productName:{
        type: String,
        required:true,
        trim:true
    },
    productPrice:{
        type:Number,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    subCategory:{
        type:String,
        required:true
    },
    images:{
        type:String,
        required:true
    },
    popular:{
        type:String,
        default:false
    },
    recommend:{
        type:String,
        default:false
    },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;