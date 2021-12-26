const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Grocery = new Schema(
    {
        name: {type: String, required: true},
        unit: {type: String, required: false},
        quantity: {type: Number, required: false},
        price: {type: Number, required: true},
    },
    { timestamps: true},
)

module.exports = mongoose.model('Groceries', Grocery)