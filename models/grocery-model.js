const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Grocery = new Schema(
    {
        name: {
            type: String, 
            required: true
        },
        unit: {
            type: String, 
            required: false
        },
        quantity: {
            type: Number, 
            min: 1,
            required: false
        },
        price: {
            type: Number, 
            min: 10,
            required: true
        },
    },
    { 
        timestamps: true
    },
)

module.exports = mongoose.model('Groceries', Grocery)