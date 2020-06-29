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
  resume_photo: {
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
    data:{
    type: Object,
    default: {}
    }
  },
  visualresumepro:{
    typeOfResume:{type: String, default: ""},
    data:{
    type: Object,
    default: {}
    }
  },
  visualresumeexp:{
    typeOfResume:{type: String, default: ""},
    data:{
    type: Object,
    default: {}
    }
  },
  version: {type: Number, default: 1}
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