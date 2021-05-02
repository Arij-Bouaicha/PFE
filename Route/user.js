const express = require('express');
const mongoose = require('mongoose')
const router = express.Router();
const User = require('../Model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
dotenv.config({ path: "../config/.env" });
const isAuth = require('../middelware/passport-setup')
//add new user
router.post("/adduser", async (req, res) => {
    const { name, lastname, age, email, phoneNumber, password } = req.body;
    const searchUser = await User.findOne({ email });
    if (searchUser) return res.status(404).json({ msg: 'user exist' })
    try {
        const newUser = User({
            name, lastname, age, email, phoneNumber, password
        })
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        newUser.password = hash;
        await newUser.save()
        await res.status(201).json({ msg: 'user added successfuly' })
    } catch (error) {
        console.log('erreur adding user', error);
        await res.status(404).json({ msg: 'error adding user' })
    }
});

//get user

router.get('/getall', async (req, res) => {
    const getResult = await User.find();
    try {
        getResult
        await res.status(201).json(getResult)
    } catch (error) {
        console.log('err get users', error);
        await res.status(400).json({ msg: 'error get all users' })
    }
})
//get CURRENT user

router.get('/current', isAuth(),(req,res)=>res.json(req.user));

// login user
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const searchUser = await User.findOne({ email });
    if (!searchUser) return  res.status(404).json({ msg: 'email or psw error' });
    const isMatch = await bcrypt.compare(password, searchUser.password);
    if (!isMatch) return  res.status(404).json({ msg: 'psw error' });
    try {
        const payload = {
            id: searchUser._id,
            name: searchUser.name,
            email: searchUser.email,
            phoneNumber: searchUser.phoneNumber
        };
        const token = await jwt.sign(payload, process.env.secretkey);
        return res.status(200).json({ token: `bearer ${token}` })
    } catch (error) {
        console.log('err get users', error);
        await res.status(400).json({ msg: 'probleme of cnx' })
    }
});


module.exports = router;