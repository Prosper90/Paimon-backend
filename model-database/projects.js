require("dotenv").config();
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const path = require("path");




mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/Paimon",
   { useNewUrlParser: true, useUnifiedTopology: true})
   .then(() => console.log('connected to DB!'))
    .catch(error => console.log(error));






//for projects
const projectSchema = mongoose.Schema({
    dateandtime : {type: Date, default: Date.now},
    id: {type: Number},
    status: {type: String},
    employer: {type: String},
    worker: {type: String},
    jobdetails: {type: String},
    amount: {type: Number},
    finisheddate: {type: Date}
  });





 module.exports = {
   Projects: mongoose.model("Projects", projectSchema),
 }
