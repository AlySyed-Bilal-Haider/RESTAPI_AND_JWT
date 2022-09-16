const express = require("express");
const router = express.Router();
var jwt = require('jsonwebtoken');

const mongomodal = require("../Schema/Postschema");
const { schema } = require("../Schema/Signupschema");
const signupmodal = require("../Schema/Signupschema");
// get single data from mongoDB
router.get("/getid/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const data = await mongomodal.findById({ _id });
    res.send(data);
  } catch (error) {
    console.log(error);
  }
});
//  get data from mongodb


router.get("/", async (req, res) => {
  try {
    const data = await mongomodal.find({});
    res.send(data);
  } catch (error) {
    console.log(error);
  }
});


//  post data in mongoos db
router.post("/postvalue", async (req, res) => {
  console.log(req.body);
  try {
    const postdata = await new mongomodal({
      goal: req.body.goal,
      goaldes: req.body.goaldes,
      category: req.body.category,
      attribute: req.body.attribute,
      goalstage: req.body.goalstage,
      jobregion: req.body.jobregion,
    });
    await postdata.save();
    res.status(200).json({
      success: true,
      message: "User record Added Successfully!",
    });
  } catch (err) {
    res.status(400).send("error", err);
  }
});


// .......Update data from MongoDB....
router.put("/editeid/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const data = await mongomodal.findByIdAndUpdate(_id, {
      goal: req.body.goal,
      goaldes: req.body.goaldes,
      category: req.body.category,
      attribute: req.body.attribute,
      goalstage: req.body.goalstage,
      jobregion: req.body.jobregion,
    });

    res.status(200).json({
      success: true,
      message: "User update Successfully!",
    });
  } catch (error) {
    console.log(error);
  }
});


// .....Remove value from mongoDB...........
router.delete("/remove/:id", async (req, res) => {
  const _id = req.params.id.trim();
  try {
    const data = await mongomodal.findByIdAndDelete(_id);
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send("error", err);
    // console.log(err);
  }
});
// ...................User schema, signup, login, token verify and fetch all user data from server...............
router.get("/getuser", async (req, res) => {
  try {
    const data = await signupmodal.find({});
    res.send(data);
  } catch (error) {
    console.log(error);
  }
});


// signup user using by signup schema
router.post("/usersignup", async (req, res) => {
  try {
    const usersignup = await new signupmodal({
      fname: req.body.fname,
      email: req.body.email,
      password:req.body.password
    });
    await usersignup.save();
    res.json({
      status:'ok',
      success: true,
      message: "User register Successfully!",
    });
  } catch (error) {
    console.log(error);
  }
});


// user login routes...........
router.post("/login", async (req, res) => {

  try {
    const data = await signupmodal.findOne({
      email: req.body.email,
    });
   if(data){
  const token=jwt.sign({ email:data.email,fname:data.fname }, "secret123");
  res.json({
    status: "ok",
    message: "User signin Successfully!",
    user:token
  });}
 else{
  res.json({
    status: "erorr",
    message: "User signin Successfully!",
    user:false
  });
 }
    
  } catch (error) {
   console.log("Invalid token");
  }
});

//Token auntications from server side then use login and start work
// ........check token verfiy method here.........
router.post("/verifytoken", async (req, res) => {
 const token=req.headers['x-access-token'];
 try{
  const decoded=jwt.verify(token,"secret123");
 const email=decoded.email;
 const data = await signupmodal.findOne({
  email: email,
});
if(data){
  res.json({
    status: "ok",
    user:data.fname
  });
}else{
  res.json({
    status: "error",
   message:"NO vaild token"
  });
}

 }catch(error){
  console.log(error)
 }
});
// module.exports = app;
module.exports = router;
