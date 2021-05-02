const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name:String,
    discription:String,
    price:Number,
    category:String,
    rating:Number,
    stock:Number,
    img:String   
})

module.exports = Product = mongoose.model('product',productSchema);