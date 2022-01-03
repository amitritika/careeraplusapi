const User = require('../models/user');
const DailyAptTest = require('../models/test/dailyAptTest');
const Discount = require('../models/discount');
const _ = require('lodash');
const formidable = require('formidable');
const fs = require('fs');
const { errorHandler } = require('../helpers/dbErrorHandler');
const url = (process.env.NODE_ENV == "development") ? process.env.CLIENT_URL_DEV : process.env.CLIENT_URL_PROD
const api = (process.env.NODE_ENV == "development") ? process.env.CLIENT_API_DEV : process.env.CLIENT_API_PROD
const key = (process.env.NODE_ENV == "development") ? process.env.TEST_MERCHANT_KEY : process.env.PROD_MERCHANT_KEY
const salt = (process.env.NODE_ENV == "development") ? process.env.TEST_MERCHANT_SALT : process.env.PROD_MERCHANT_SALT
const axios = require("axios");
const crypto = require("crypto");
var querystring = require("querystring");
exports.read = (req, res) => {
    req.profile.hashed_password = undefined;
    req.profile.profile_photo = undefined;
    //req.profile.photo = undefined;
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
        user.profile = `${url}/${user.username}`

        if (files.photosrc) {
            if (files.photosrc.size > 10000000) {
                return res.status(400).json({
                    error: 'Image should be less than 1mb'
                });
            }
            
            user.photo.data = fs.readFileSync(files.photosrc.path);
            
            
            user.photo.contentType = files.photosrc.type;
        }
      //user.photo.data = fs.readFileSync(files.photosrc.path);

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

exports.profilephoto = (req, res) => {
    const username = req.params.username;
    User.findOne({ username }).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'User not found'
            });
        }
        if (user.profile_photo.data) {
            res.set('Content-Type', user.profile_photo.contentType);
            
            return res.send(user.profile_photo.data);
        }
    });
};

exports.readpublic = (req, res) => {
    const username = req.params.username;
    User.findOne({ username }).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'User not found'
            });
        }
         else  {
            user.hashed_password = undefined;
            user.email = "dummy@mail.com";
            user.salt = undefined;
            
            return res.send(user);
        }
        
    });
};

exports.updateprofilephoto = (req, res) => {
  let form = new formidable.IncomingForm();
    form.keepExtension = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Photo could not be uploaded'
            });
        }
        let user = req.profile;
        
        if (files.photosrc) {
            if (files.photosrc.size > 10000000) {
                return res.status(400).json({
                    error: 'Image should be less than 1mb'
                });
            }
            
            user.profile_photo.data = fs.readFileSync(files.photosrc.path);
            
            
            user.profile_photo.contentType = files.photosrc.type;
        }
      //user.photo.data = fs.readFileSync(files.photosrc.path);

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
}

exports.resumephoto = (req, res) => {
    const username = req.params.username;
    User.findOne({ username }).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'User not found'
            });
        }
        if (user.resume_photo.data) {
            res.set('Content-Type', user.resume_photo.contentType);
            
            return res.send(user.resume_photo.data);
        }
    });
};

exports.updateresumephoto = (req, res) => {
  let form = new formidable.IncomingForm();
    form.keepExtension = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Photo could not be uploaded'
            });
        }
        let user = req.profile;
        
        if (files.photosrc) {
            if (files.photosrc.size > 10000000) {
                return res.status(400).json({
                    error: 'Image should be less than 1mb'
                });
            }
            
            user.resume_photo.data = fs.readFileSync(files.photosrc.path);
            
            
            user.resume_photo.contentType = files.photosrc.type;
        }
      //user.photo.data = fs.readFileSync(files.photosrc.path);

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
}


exports.profileresume = (req, res) => {
    const username = req.params.username;
    User.findOne({ username }).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'User not found'
            });
        }
        if (user.profile_resume.leftH) {
            
            return res.send(user.profile_resume);
        }
    });
};

exports.updateprofileresume = (req, res) => {
  let list = req.body.list;
  let bg = req.body.bg;
  let font = req.body.font;
  let user = req.profile;
  
  user.profile_resume = {list, bg, font}     
        
  user.save((err, result) => {
      if (err) {
          return res.status(400).json({
              error: 'All fields required'
          });
      }
      user.hashed_password = undefined;
      user.salt = undefined;
      user.photo = undefined;
      user.profile_photo = undefined;
      user.resume_photo = undefined;
      res.json(user.profile_resume);
  });
}


exports.updateTransactionsUser = (req, res) => {
  
  let user = req.profile;  
      delete user.__v;
  user.update((err, result) => {
      if (err) {
        console.log(err);
          return res.status(400).json({
              error: 'All fields required'
          });
      }
      user.hashed_password = undefined;
      user.salt = undefined;
      user.photo = undefined;
      user.profile_photo = undefined;
      user.resume_photo = undefined;
      res.json(user.transactions);
  });
}

exports.updateTransactions = (req, res) => {
    var arr = [];
    const username = req.params.username;
    const txnid = req.params.txnid;
    var hashString = key + "|" + "verify_payment|" + txnid + "|" + salt;
    var cryp = crypto.createHash('sha512');
    cryp.update(hashString);
    var hash = cryp.digest('hex');
    const obj = {
      key: key,
      command: "verify_payment",
      hash: hash,
      var1: txnid
    };
    const params = {
      headers: { 
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }
    
    axios
      .post('https://test.payu.in/merchant/postservice.php?form=2', querystring.stringify(obj), params)
      .then(response => {
        let discount_slug = response.data.transaction_details[txnid].udf1;
        let status = response.data.transaction_details[txnid].status;
        
        User.findOneAndUpdate({ username }, { $push: { "transactions": { $each: [response.data.transaction_details], $position: 0 } } }, {new: true}).exec((err, user) =>{
          if (err || !user) {
            return res.status(400).json({
                error: 'User not found'
            });
          }else{
            if(discount_slug !== "" && status == "success"){
              axios
                .get(`${api}/discount/${discount_slug}`)
                .then(c => {
                  let discount = c.data[0];
                  let slug = c.data[0].slug;
                  let count = discount.count;
                  let today = new Date();
                  let lastDate = new Date(discount.lastDate);
                  discount.count = count - 1;
                  if(lastDate < today){
                    discount.expired = true;
                  }
                  Discount.findOneAndUpdate({ slug }, { $set: { "count": discount.count, "expired": discount.expired } }, {new: true}).exec((error, result) =>{
                    if(error){
                      console.log(err);
                        return res.status(400).json({
                            error: 'All fields required'
                        });
                    }else{
                      console.log(result);
                      res.redirect(`${url}/user/payment/status`);
                    }
                  });
                  
                })
            }else {
              res.redirect(`${url}/user/payment/status`);
            }
            
          }
        })
      })
      .catch(error => {
        console.error(error);
      })
};