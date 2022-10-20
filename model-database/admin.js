require("dotenv").config();
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const path = require("path");




mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/Paimon",
   { useNewUrlParser: true, useUnifiedTopology: true})
   .then(() => console.log('connected to DB!'))
    .catch(error => console.log(error));



  



//for users collection
const userSchema = mongoose.Schema({
    dateandtime : {type: Date, default: Date.now},
    address: {type: String},
    bought: {type: Number},
    sold: {type: Number},
    profits: {type: Number},
    borrowamount: {type: Number}
});


 module.exports = {
   Users: mongoose.model("userSchema", userSchema),
 }
