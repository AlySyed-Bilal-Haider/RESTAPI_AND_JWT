const mongoose = require("mongoose");
const Mealadds = new mongoose.Schema({
  goal  : {
    type: String,
    trim: true,
  },
  goaldes : {
    type: String,
    trim: true,
  },
  category : {
    type: String,
    trim: true,
  },
  attribute : {
    type: String,
    trim: true,
  },
  goalstage : {
    type: String,
    trim: true,
  },
  jobregion : {
    type: String,
    trim: true,
  },
});
const mongomodal=mongoose.model("usersave", Mealadds);
module.exports = mongomodal;
