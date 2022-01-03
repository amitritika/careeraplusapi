const User = require('../models/user');
const _ = require('lodash');
const formidable = require('formidable');
const fs = require('fs');
const { errorHandler } = require('../helpers/dbErrorHandler');

// sendgrid
const sgMail = require('@sendgrid/mail'); // SENDGRID_API_KEY
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const CLIENT_URL = (process.env.NODE_ENV == "development") ? process.env.CLIENT_URL_DEV : process.env.CLIENT_URL_PROD

exports.readVisualresume = (req, res) => {
    req.profile.hashed_password = undefined;
    //res.send("Hi")
    return res.json(req.profile.visualresume);
};



exports.updateVisualresume = (req, res) => {
    let user = req.profile;
  
    user.visualresume = req.body;
    user.version = 1;
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
        res.json(user);
    });
};


exports.readVisualresumeexp = (req, res) => {
    req.profile.hashed_password = undefined;
    //res.send("Hi")
    return res.json(req.profile.visualresumeexp);
};

exports.updateVisualresumeexp = (req, res) => {
    let user = req.profile;
  
    user.visualresumeexp = req.body;
    user.save((err, result) => {
        if (err) {
            return res.status(400).json({
                error: 'All fields required'
            });
        }
        user.hashed_password = undefined;
        user.salt = undefined;
        res.json(user);
    });
};


exports.readVisualresumepro = (req, res) => {
    req.profile.hashed_password = undefined;
    //res.send("Hi")
    return res.json(req.profile.visualresumepro);
};

exports.updateVisualresumepro = (req, res) => {
    let user = req.profile;
  
    user.visualresumepro = req.body;
    user.save((err, result) => {
        if (err) {
            return res.status(400).json({
                error: 'All fields required'
            });
        }
        user.hashed_password = undefined;
        user.salt = undefined;
        res.json(user);
    });
};

exports.contactFormUserProfile = (req, res) => {
    const { username, email, name, message } = req.body;
    //console.log(req.body);
  let userEmail = "";
  
  User.findOne({ username }, (err, user) => {
        if (!user) {
            return res.status(400).json({
                error: 'Something Went Wrong'
            });
        }else {
          userEmail = user.email;
          
          const emailData = {
              to: userEmail,
              from: `contact@careeraplus.in`,
              subject: `Digital Profile Contact form - ${process.env.APP_NAME}`,
              text: `Email received from contact from from your Digital Profile \n Sender name: ${name} \n Sender email: ${email} \n Sender message: ${message}`,
              html: `
                  <h4>Email received from contact form from your Digital Profile:</h4>
                  <p>Sender name: ${name}</p>
                  <p>Sender email: ${email}</p>
                  <p>Sender message: ${message}</p>
                  <hr />
                  <p>This email may contain sensetive information</p>
                  <p>https://careeraplus.in</p>
              `
          };

          sgMail.send(emailData)
            .then(sent => {
              return res.json({
                  success: true
              });
          })
        .catch(error => {
          // Log friendly error
          console.error(error);

          if (error.response) {
            // Extract error msg
            const {message, code, response} = error;

            // Extract response msg
            const {headers, body} = response;

            console.error(body);
          }
        });
           }
  })

    
};
