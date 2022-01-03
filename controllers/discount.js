const Discount = require('../models/discount');
const Blog = require('../models/blog');
const slugify = require('slugify');
const { errorHandler } = require('../helpers/dbErrorHandler');

exports.create = (req, res) => {
    const name = req.body.name;
    const type = req.body.type;
    const amount = req.body.amount;
    const lastDate = req.body.lastDate;
    const count = req.body.count;
    const productinfo = req.body.productinfo;
    let slug = slugify(name).toLowerCase();

    let discount = new Discount({ name, type, amount, lastDate, count, productinfo, slug });

    discount.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(data);
    });
};

exports.list = (req, res) => {
    Discount.find({}).exec((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(data);
    });
};

exports.read = (req, res) => {
    const slug = slugify(req.params.slug).toLowerCase();
    Discount.find({ slug }).exec((err, data) => {
      if(err){
        
        return res.status(400).json({
                error: errorHandler(err)
            });
      }
      if(data.length == 0){
        
        return res.status(400).json({
                error: "Coupon Not Available"
            });
      }else{
        return res.json(data);
      }
      
      
    })
};

exports.remove = (req, res) => {
    const slug = req.params.slug.toLowerCase();

    Discount.findOneAndRemove({ slug }).exec((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json({
            message: 'Discount deleted successfully'
        });
    });
};

exports.update = (req, res) => {
    
    const slug = req.params.slug;
    const count = req.body.count
    Discount.findOneAndUpdate({ slug }, { $set: { "count": count } }, {new: true}).exec((err, discount) =>{
          if (err || !discount) {
            return res.status(400).json({
                error: 'Discount not found'
            });
          }else{
            res.json(discount);
          }
        })
};