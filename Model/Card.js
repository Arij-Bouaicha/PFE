const mongoose = require("mongoose");

const cardSchema = mongoose.Schema({
    cardList: {},
    client: {},
    somme:0,
    confirm: { type: String, default:false}
});

module.exports = Card = mongoose.model("card", cardSchema);