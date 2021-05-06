const express = require('express');
const conxionDb = require('./config/dbConnexion');
const dotenv = require("dotenv");
dotenv.config({ path: "./config/.env" });
const user = require('./Route/user')
const product = require('./Route/product');
const app = express();
const card = require('./Route/card')

app.use(express.json());
conxionDb();
app.use('/api/card', card);
app.use('/api/user', user);
app.use('/api/product', product);

const port = process.env.PORT || 5000;

app.listen(port, (err) => {
    err ? console.log('erreur serveur') : console.log('server is running on', port)
})