const express = require("express");
const { route } = require("./product");
const Card = require('../Model/Card');

const router = express.Router();

router.post('/addcard', async (req, res) => {
    try {
        const newcard = new Card(req.body);
        console.log('neee',newcard)
        await newcard.save();
        await res.status(201).json({ msg: 'Card added succesfuly' })

    } catch (error) {
        console.error('impoosible dajouter au panier ', error);
        res.status(401).json({ msg: 'Card register Failed' })
    }
})

router.get('/getall', async (req, res) => {
    try {
        const allO = await Card.find();
        allO
        await res.status(201).json(allO)
    } catch (error) {
        console.error("getting Order failed", error);
        res.status(401).json({ msg: `getting Order Failed` });
    }
})


module.exports = router;