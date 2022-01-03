const mongoose = require('mongoose');

const discountSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
            max: 32
        },
        slug: {
            type: String,
            unique: true,
            index: true
        },
        type: {
            type: String,
            default: "p"
        },
      amount: {
        type: Number,
        default: 10
      },
      lastDate: {
        type: Date
      },
      count: {
        type: Number,
        default: 10
      },
      productinfo: {
        type: String,
        default: "Visualresume"
      },
      expired: {
        type: Boolean,
        default: false
      }
    },
    { timestamp: true }
);

module.exports = mongoose.model('Discount', discountSchema);