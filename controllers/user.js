const User = require('../models/user');
const DailyAptTest = require('../models/test/dailyAptTest');
const _ = require('lodash');
const formidable = require('formidable');
const fs = require('fs');
const { errorHandler } = require('../helpers/dbErrorHandler');

exports.read = (req, res) => {
    req.profile.hashed_password = undefined;
    //res.send("Hi")
    return res.json(req.profile);
};



exports.update = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtension = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Photo could not be uploaded'
            });
        }
        let user = req.profile;
        user = _.extend(user, fields);

        if (files.photo) {
            if (files.photo.size > 10000000) {
                return res.status(400).json({
                    error: 'Image should be less than 1mb'
                });
            }
            
            user.photo.data = fs.readFileSync(files.photo.path);
            
            user.photo.contentType = files.photo.type;
        }

        user.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: 'All fields required'
                });
            }
            user.hashed_password = undefined;
            user.salt = undefined;
            user.photo = undefined;
            res.json(user);
        });
    });
};

exports.photo = (req, res) => {
    const username = req.params.username;
    User.findOne({ username }).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'User not found'
            });
        }
        if (user.photo.data) {
            res.set('Content-Type', user.photo.contentType);
            
            return res.send(user.photo.data);
        }
    });
};

exports.userDailyTestList = (req, res) => {
   return res.json(req.profile.dailytest);
};

exports.updateUserDailyTestList = (req, res) => {
    let user = req.profile;
    user.dailytest = req.body;
    user.save((err, result) => {
        if (err) {
            return res.status(400).json({
                error: 'All fields required'
            });
        }
        user.hashed_password = undefined;
        user.salt = undefined;
        res.json(user.dailytest);
    });
};

exports.updateAptitudeTestUser = (req, res) => {
  let id = req.profile._id
  let overallresponse = req.body.overallresponse;
  let answersresponse = req.body.answersresponse;
  let slug = req.params.slug;
  overallresponse.user = id;
  answersresponse.user = id;
  DailyAptTest.findOne({ slug }).exec((err, oldTest) => {
    if (err) {
        return res.status(400).json({
            error: errorHandler(err)
        });
    }
    
    oldTest.slug = slug;
    oldTest.overallresponse.push(overallresponse)
    oldTest.answersresponse.push(answersresponse)
    
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