const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema(
    {
      name:{
        type: String,
        defualt: "images"
      },
      
        main: {
          data: Buffer,
          contentType: String
        },
      visualresume: {
          data: Buffer,
          contentType: String
        },
      examplan: {
          data: Buffer,
          contentType: String
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Image', imageSchema);