require("dotenv").config();
const express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser');
const { id } = require("ethers/lib/utils");
const Users = require("./model-database/users").Users;
//const Borrowed = require("./model-database/borrowed").Borrowed;




const app = express();



app.use(express.urlencoded({ extended: true }));

// parse application/json
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors())











app.get("/",  function(req, res){
  res.send("welcome");
});




//get user dashboard details
app.get("/user/:address",  async function(req, res){


   const user = await Users.findOne({address: req.params.address}, function(err, user){
        if(err){
          return false; 
        } else {
      return user;
      
      }
        }).clone();

    res.send({user: user});

  });




  

  //create a user
app.post("/user", async function(req, res){

    //console.log(req.body);
    try{    
        //console.log(req.body.address);
        //console.log(req.body.txhash);
        let user = new Users({
            type: req.body.type,
            address: req.body.address,
            jobskill: req.body.jobskill,
            revenue: req.body.revenue,
        });
    
      
        user.save();
    
  
        res.send(true);
  
  
      } catch {
      res.send(false);
      }
    
    
  
    });



    //create a project
   app.post("/user/createproject",  async function(req, res){

    await Users.findOne({address: req.body.address}, function(err, user){

            if(err){
            return false; 
            } else {

                //console.log(user);
                user.projects.push({
                  id: req.params.id,
                  status: req.params.status,
                  employer: req.params.employer,
                  worker: req.params.worker,
                  jobdetails: req.params.jobdetails,
                  amount: req.params.amount,
                  finisheddate: req.params.finisheddate
                })

                user.Notification.push({type: "Deposit", message: "Deposit confirmed begin work" });

                user.markModified('Projects');
                user.markModified('Notification');
                user.save(function(saveerr, saveresult){
                if(saveerr){
                    return false;
                } else {
                    return true;
                }
            
            });
       
       }
       
         }).clone();
 
 
   });




    //complete job
    app.post("/user/completejob",  async function(req, res){

      await Users.findOne({address: req.body.address}, function(err, user){
 
             if(err){
             return false; 
             } else {
  
                user.Projects.map((data, index) => {

                    if(data.id === req.body.id) {
                        data.status = "done";
                    }

                 })

                 user.markModified('Projects');
                 user.save(function(saveerr, saveresult){
                 if(saveerr){
                     return false;
                 } else {
                     return true;
                 }
             
             });
        
        }
        
          }).clone();
  
  
    });


    
  


app.listen(process.env.PORT || 8000,  function(){
  console.log("App is listening on url http://localhost:8000");
});
