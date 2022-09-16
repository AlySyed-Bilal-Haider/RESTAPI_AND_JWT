const mongoose = require("mongoose");
const Mealadds = new mongoose.Schema({
  fname  : {
    type: String,
    trim: true,
    required:true
  },
  email : {
    type: String,
    trim: true,
    required:true,
    unique:true
  },
  password:{
    type:String, required:true
  }
 
});
const mongomodal=mongoose.model("signupuser", Mealadds);
module.exports = mongomodal;
