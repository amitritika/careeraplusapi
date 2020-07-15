const mongoose = require('mongoose');

const buttonSchema = new mongoose.Schema(
    {
        name: {
            type: String
        },
        button: {
            type: String
        },
        discount: {
          type: Number
        }
    },
    { timestamp: true }
);

module.exports = mongoose.model('Button', buttonSchema);