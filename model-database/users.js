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

  //for notifications
  const noificationSchema = mongoose.Schema({
    dateandtime : {type: Date, default: Date.now},
    type: {type: String},
    message: {type: String}
  });
  



//for users collection
const userSchema = mongoose.Schema({
    dateandtime : {type: Date, default: Date.now},
    type: {type: String},
    address: {type: String},
    jobskill: {type: String},
    revenue: {type: Number},
    Projects: [projectSchema],
    Notification: [noificationSchema]
});


 module.exports = {
   Users: mongoose.model("userSchema", userSchema),
 }
