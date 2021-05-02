const mongoose = require('mongoose');
const dotenv = require("dotenv");
dotenv.config({ path: "../config/.env" });
// const conxionDb = () =>{
//     mongoose.connect(process.env.MONGO_URI, (err)=>{
//         err? console.log('erreur db connect') : console.log('db connected');
//     })
// }
// console.log('test', process.env.MONGO_URI)
const conxionDb = async () => {
    try {
        mongoose.connect(process.env.MONGO_URI, { useUnifiedTopology: true, useNewUrlParser: true, useUnifiedTopology: true })
        console.log('database connected');
    } catch (error) {
        console.log('erreru cnx ', error);
    }
}
module.exports = conxionDb;