const User = require('../../models/user');
const DailyAptTest = require('../../models/test/dailyAptTest');
const _ = require('lodash');
const formidable = require('formidable');
const fs = require('fs');
const { errorHandler } = require('../..//helpers/dbErrorHandler');


exports.aptitudeTest = (req, res) => {
  let slug = req.params.slug;
  DailyAptTest.findOne({ slug }).exec((err, test) => {
    if (err) {
        return res.status(400).json({
            error: errorHandler(err)
        });
    }
    res.json(test);
  });
};

exports.createAptitudeTest = (req, res) => {
  const months = ["jan", "feb", "mar", "apr", "may", "jun","jul", "aug","sep","oct","nov","dec"];
  let date = new Date(req.body.date);
  let name = req.body.name
  let str = (date.getDate()).toString() + "-" + months[date.getMonth()] + "-" + (date.getFullYear()).toString();
  let slug = "daily-"+ name + "-test-" + str;
  let num = req.body.numberOfQues;
  let questions = [];
  let overallresponse = [];
  let answersresponse = [];
  var obj = {
      question: "",
      optiona: "",
      optionb: "",
      optionc: "",
      optiond: "",
      answer: "a",
      solution: ""
    }
  for (var i = 0; i<num; i++){
    questions.push(obj)
  }
   
  let test = new DailyAptTest();
  
  test.slug = slug;
  test.date = date;
  test.questions = questions;
  test.overallresponse = overallresponse;
  test.answersresponse = answersresponse;
  test.test = name;
  
  test.save( (err, result)=> {
    if(err){
      return res.status(400).json({
          error: errorHandler(err)
      });
    }
    res.json(result)
  });
};



exports.updateAptitudeTest = (req, res) => {
  let questions = req.body;
  let slug = req.params.slug;
  
  
  DailyAptTest.findOne({ slug }).exec((err, oldTest) => {
    if (err) {
        return res.status(400).json({
            error: errorHandler(err)
        });
    }
    
    oldTest.slug = slug;
    oldTest.questions = questions;
    
    oldTest.save((e, r)=> {
      if(e){
         return res.status(400).json({
            error: errorHandler(e)
        });
      }
      res.json(r);
    });
    
  });
};

exports.removeAptitudeTest = (req, res) => {
  let slug = req.params.slug;
  
  
  DailyAptTest.findOneAndRemove({ slug }).exec((err, oldTest) => {
    if (err) {
        return res.status(400).json({
            error: errorHandler(err)
        });
    }
    
    res.json({
            message: 'Blog deleted successfully'
        });
  });
};

exports.listAptitudeTest = (req, res) => {
  let test = req.params.test;  
  
  DailyAptTest.find({ "test": `${test}` })
    .select('slug date')
    .exec((err, data) => {
    if (err) {
        return res.status(400).json({
            error: errorHandler(err)
        });
    }
    
    res.json(data);
  });
};


