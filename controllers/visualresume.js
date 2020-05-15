const User = require('../models/user');
const _ = require('lodash');
const formidable = require('formidable');
const fs = require('fs');
const { errorHandler } = require('../helpers/dbErrorHandler');

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


