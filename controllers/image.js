const Image = require('../models/image');
const { errorHandler } = require('../helpers/dbErrorHandler');
const fs = require('fs');
const formidable = require('formidable');

exports.create = (req, res) => {
    

    let image = new Image({ });
  image.name = "images1"
  image.main.contentType = "image/jpeg"
  image.visualresume.contentType = "image/jpeg"
  image.examplan.contentType = "image/jpeg"

    image.save((err, data) => {
        if (err) {
            console.log(err);
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(data); // dont do this res.json({ tag: data });
    });
};


exports.createMain = (req, res) => {
  let form = new formidable.IncomingForm();
    form.keepExtension = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Photo could not be uploaded'
            });
        }
        let image = {}
        
        if (files.photo) {
            if (files.photo.size > 10000000) {
                return res.status(400).json({
                    error: 'Image should be less than 1mb'
                });
            }
            
            Image.findOne({ name: "images"}).exec((err, data) => {
                  if (err || !data) {
                      return res.status(400).json({
                          error: 'data not found'
                      });
                  }
                  data.main.data = fs.readFileSync(files.photo.path);
            
            
                  data.main.contentType = files.photo.type;
              
                  data.save((err, result) => {
                  if (err) {
                      return res.status(400).json({
                          error: 'All fields required'
                      });
                  }else{
                    return res.status(200).json({
                          message: 'Photo Updated'
                      });
                  }
                  
                  }); 
                  
              });
        }else{
          return res.status(400).json({
                          error: 'data not found'
                      });
        }
    });
               }

exports.readMain = (req, res) => {
    
    Image.findOne({name: "images"}).exec((err, data) => {
        if (err || !data) {
            return res.status(400).json({
                error: 'Image not found'
            });
        }
         else  {
           if (data.main.data) {
            res.set('Content-Type', data.main.contentType);
            
            return res.send(data.main.data);
           }
        }
        
    });
};

exports.createExamplan = (req, res) => {
  let form = new formidable.IncomingForm();
    form.keepExtension = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Photo could not be uploaded'
            });
        }
        let image = {}
        
        if (files.photo) {
            if (files.photo.size > 10000000) {
                return res.status(400).json({
                    error: 'Image should be less than 1mb'
                });
            }
            
            Image.findOne({ name: "images"}).exec((err, data) => {
                  if (err || !data) {
                      return res.status(400).json({
                          error: 'data not found'
                      });
                  }
                  data.examplan.data = fs.readFileSync(files.photo.path);
            
            
                  data.examplan.contentType = files.photo.type;
              
                  data.save((err, result) => {
                  if (err) {
                      return res.status(400).json({
                          error: 'All fields required'
                      });
                  }else{
                    return res.status(200).json({
                          message: 'Photo Updated'
                      });
                  }
                  
                  }); 
                  
              });
        }else{
          return res.status(400).json({
                          error: 'data not found'
                      });
        }
    });
               }

exports.readExamplan = (req, res) => {
    
    Image.findOne({name: "images"}).exec((err, data) => {
        if (err || !data) {
            return res.status(400).json({
                error: 'Image not found'
            });
        }
         else  {
           if (data.examplan.data) {
            res.set('Content-Type', data.examplan.contentType);
            
            return res.send(data.examplan.data);
           }
        }
        
    });
};

exports.createVisualresume = (req, res) => {
  let form = new formidable.IncomingForm();
    form.keepExtension = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Photo could not be uploaded'
            });
        }
        let image = {}
        
        if (files.photo) {
            if (files.photo.size > 10000000) {
                return res.status(400).json({
                    error: 'Image should be less than 1mb'
                });
            }
            
            Image.findOne({ name: "images"}).exec((err, data) => {
                  if (err || !data) {
                      return res.status(400).json({
                          error: 'data not found'
                      });
                  }
                  data.visualresume.data = fs.readFileSync(files.photo.path);
            
            
                  data.visualresume.contentType = files.photo.type;
              
                  data.save((err, result) => {
                  if (err) {
                      return res.status(400).json({
                          error: 'All fields required'
                      });
                  }else{
                    return res.status(200).json({
                          message: 'Photo Updated'
                      });
                  }
                  
                  }); 
                  
              });
        }else{
          return res.status(400).json({
                          error: 'data not found'
                      });
        }
    });
               }

exports.readVisualresume = (req, res) => {
    
    Image.findOne({name: "images"}).exec((err, data) => {
        if (err || !data) {
            return res.status(400).json({
                error: 'Image not found'
            });
        }
         else  {
           if (data.visualresume.data) {
            res.set('Content-Type', data.visualresume.contentType);
            
            return res.send(data.visualresume.data);
           }
        }
        
    });
};