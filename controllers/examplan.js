const User = require('../models/user');
const _ = require('lodash');
const formidable = require('formidable');
const fs = require('fs');
const { errorHandler } = require('../helpers/dbErrorHandler');

exports.readExamplan = (req, res) => {
    req.profile.hashed_password = undefined;
    //res.send("Hi")
    return res.json(req.profile.examplan);
};



exports.updateExamplan = (req, res) => {
    let user = req.profile;
    user.examplan = req.body.examplan;
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
