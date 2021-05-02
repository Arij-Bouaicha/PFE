const { default: axios } = require('axios');
const express = require('express');
const mongoose = require('mongoose')
const router = express.Router();
const Product = require('../Model/Product')


router.post('/addproduct',async(req,res)=>{
    const{name,discription,price,category,rating,stock,img}=req.body;
    try {
        const newProduct = Product({name,discription,price,category,rating,stock,img});
        await newProduct.save()
        await res.status(201).json({msg:'product added successfuly'})
    } catch (error) {
        await res.status(404).json({ msg: 'error adding product' })
    }
})

router.get('/getallproduct',async(req,res)=>{
    const getResult = await Product.find();
    try {
        getResult
        await res.status(200).json(getResult)
    } catch (error) {
        await res.status(400).json({ msg: 'error get all product' })
    }
})


module.exports = router;