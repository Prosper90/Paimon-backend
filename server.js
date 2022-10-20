require("dotenv").config();
const express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser');
const Users = require("./model-database/users").Users;
const Projects = require("./model-database/projects").Projects;



const app = express();



app.use(express.urlencoded({ extended: true }));

// parse application/json
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors())











app.get("/",  function(req, res){
  res.send("welcome");
});




//get user dashboard details by returning particular user
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


//function to make notifications
const notifyWorker = async (workeraddress) => {

  await Users.findOne({address: workeraddress}, function(err, user){
 
    if(err){
    return false; 
    } else {


       user.Notification.push({type: "Deposit", message: "Deposit confirmed begin work" });

        
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

}

  

  //create a user
  app.post("/user", async function(req, res){

    //console.log(req.body);
    try{    

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


          try{    

            let project = new Projects({
              id: req.params.id,
              status: req.params.status,
              employer: req.params.employer,
              worker: req.params.worker,
              jobdetails: req.params.jobdetails,
              amount: req.params.amount,
              finisheddate: req.params.finisheddate
            })

    
            project.save();
            notifyWorker(req.params.worker);

            res.send(true);


          } catch {
          res.send(false);
          }
 
   });




   //return all projects
   app.get("/projects",  async function(req, res){


    const projects = await Projects.find().clone(); 
 
     res.send({project: projects});
 
   });




    //complete job
    app.post("/user/completejob",  async function(req, res){

      await Projects.findOne({id: req.body.id}, function(err, project){
 
             if(err){
             return false; 
             } else {
  

                 project.status = "done";


                 project.save(function(saveerr, saveresult){
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
