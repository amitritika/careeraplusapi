const mongoose = require("mongoose");
const crypto = require("crypto");


const userSchema = new mongoose.Schema({
  username: {
    type: String,
    trim: true,
    required: true,
    max: 32,
    unique: true,
    index: true,
    lowercase: true
  },
  name: {
    type: String,
    trim: true,
    required: true,
    max: 32,
  },
  email: {
    type: String,
    trim: true,
    required: true,
    lowercase: 32,
    unique: true
  },
  profile: {
    type: String,
    required: true
  },
  profile_photo: {
    data: Buffer,
    contentType: String
  },
  hashed_password: {
    type: String,
    required: true
  },
  salt: String,
  about: {
    type: String,
  },
  role: {
    type: Number,
    default: 0
  },
  photo: {
    data: Buffer,
    contentType: String
  },
  resetPasswordLink: {
    data: String,
    default: ""
  },
  examplan:{
    goal: {type: Array}, 
    calendar: {type: Object},
    test: {type: Array, default: []},
    answersresponse: {type: Array, default: []},
    overallresponse: {type: Array, default: []}
  },
  dailytest: {
    test: {type: Array, default: []},
    answersresponse: {type: Array, default: []},
    overallresponse: {type: Array, default: []}
  },
  visualresume:{
    typeOfResume:{type: String, default: ""},
    pesrsonalInformation: {
      name: {type: String},
      email: {type: String},
      phone: {type: String, default: "9xxxxxxxx9"},
      designation:{type: String, default: "Mxxxxxxxl Exxxxxxr"},
      address:{type: String, default: "BHOPAL, INDIA"},
      aboutMe: {type: String, default: "To work in an organization where I can use my skills to achieve the organization objectives and get conductive environment to learn and grow."}
    },
    educationalInformation: {
        latestDegree: {type: String, default:"Btech Mechanical"},
        latestCollege: {type: String, default: "OIST Bhopal"},
        latestMonth: {type: String, default: "Jun"},
        latestYear: {type: String, default: "2017"},
        latestCgpa: {type: String, defualt: "8.02 CGPA"},
        nextDegree: {type: String, default: "10+2 HSC"},
        nextCollege: {type: String, default: "CBSE"},
        nextMonth: {type: String, default: "Jun"},
        nextYear: {type: String, default: "2013"},
        nextCgpa: {type: String, default: "68.07%"},
        lastDegree: {type: String, default: "10 SSC"},
        lastCollege: {type: String, default: "CBSE"},
        lastMonth: {type: String, default: "May"},
        lastYear: {type: String, default: "2011"},
        lastCgpa: {type: String, default: "8.2 CGPA"}
      },
    projectInformation: {
        majTitle:{type: String, default:"TREADMIL BICYCLE"},
        majDes:{type: String, default:"<p>Treadmill bicycle is a unique way of moving. In this project we made a prototype of a bicycle which gets the power not with pedal wheel but with the movement of treadmill belt when you walk on it.</p>"},
        minTitle:{type: String, default:"Gear CAD Design"},
        minDes:{type: String, default:"<p>Designed Gear Design in Pro-E, uing a parametric Model. <br> By using only two parameters, Module and No. of theeths a CAD model will be generated automatically.</p>"}
        
      },
    trainingInformation: {
        training1: {type: String, default:"Industrial Training"},
        org1: {type: String, default:"EICHER TRACTORS"},
        startDate1: {type: String, default:"01/05/2015"},
        endDate1: {type: String, default:"01/06/2015"},
        des1: {type: String, default:"<p>Unit of TAFE Motors and Tractor Ltd. Projects Handled: <p> 1. Rapid Entire Body Assessment (REBA) </p> <p>2. Hazard Identification and Risk Analysis (HIRA)</p>"},
        training2: {type: String, default:"Industrial Training"},
        org2:{type: String, default:"BHEL Bhopal"},
        startDate2: {type: String, default:"01/07/2016"},
        endDate2: {type: String, default:"01/07/2016"},
        des2: {type: String, default:"<p>Unit of Turbine Manufacturing.<br>Gained Knowledge on Manufacturing and Design process of Gas Turbine.</p>"},
        trainingDisplay: {type: Boolean, default:false}
      },
    skills: {
        skill1: {type: String, default:"Pro-E"},
        rating1: {type: String, default:"4"},
        skill2: {type: String, default:"AUTOCAD"},
        rating2: {type: String, default:"4"},
        skill3: {type: String, default:"MS Office"},
        rating3: {type: String, default:"3"},
        skill4: {type: String, default:"Good and Efficient learner"},
        rating4: {type: String, default:"5"},
        skill5: {type: String, default:"Positive Attitude"},
        rating5: {type: String, default:"5"},
        skill6: {type: String, default:"Skill 6"},
        rating6: {type: String, default:"4"},
        skill6Display: {type: Boolean, default:false},
        skill7: {type: String, default:"Skill 7"},
        rating7: {type: String, default:"5"},
        skill7Display: {type: Boolean, default:false}
      },
      hobbies: {
        hobby1: {type: String, default:"Tennis"},
        hobby2: {type: String, default:"Running"},
        hobby3: {type: String, default:"Playing Guitar"}
      },
    areaOfIntrest:{
        area: {type: String, default:"eng"},
        area1: {type: String, default:"ME"},
        area1Topic: {type: String, default:"Strength of Materials"},
        area2: {type: String, default:"ME"},
        area2Topic: {type: String, default:"Fluid Mechanics"},
        area3: {type: String, default:"ME"},
        area3Topic: {type: String, default:"Heat Tranfer"},
        show: false
      },
    extraCurricular: {
        extra1: {type: String, default:"Qualified GATE 2018"},
        extra2: {type: String, default:"Won 3rd Prize in Debate Competition in College"},
        extra3: {type: String, default:"Active member of KD Food for Life a Non-profit Social organization"},
        extra4: {type: String, default:""},
        extra5: {type: String, default:""},
        extra4Display: {type: Boolean, default:false},
        extra5Display: {type: Boolean, default:false}
      }
  },
  visualresumeexp:{
    typeOfResume:{type: String, default: ""},
    data:{
    type: Object,
    default: {}
    }
  }
  
}, 
{timestamp: true}
                                      );

userSchema
  .virtual("password")
  .set(function(password){
    //create a temprory variable called _password
    this._password = password;
    //Generate Salt
    this.salt = this.makeSalt();
    //encryptPassword
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function(){
    return this._password
  });

userSchema.methods = {
  
  authenticate: function(plainText){
    return this.encryptPassword(plainText) == this.hashed_password;
  },
  encryptPassword: function(password){
    if (!password) return "";
    try {
      return crypto
            .createHmac("sha1", this.salt)
            .update(password)
            .digest("hex");
      
    } catch (err) {
      return "";
    }
  },
  
  makeSalt: function(){
    return Math.round(new Date().valueOf() * Math.random())+"";
  }
}


module.exports = mongoose.model("User", userSchema);