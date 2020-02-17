const mongoose = require("mongoose");

const dailyAptTestSchema = new mongoose.Schema({
  slug: {
    type: String,
    unique: true
  },
  test:{
    type: String
  },
  date: {
    type: Date
  },
  questions: {
    type: Array,
    default: []
  },
  overallresponse: {
    type: Array,
    default: []
  },
  answersresponse: {
    type: Array,
    default: []
  }
}, 
{timestamp: true}
                   );


module.exports = mongoose.model("DailyAptTest", dailyAptTestSchema);