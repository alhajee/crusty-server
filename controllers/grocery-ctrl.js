const Grocery = require('../models/grocery-model')

createGrocery = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a grocery',
        })
    }

    const grocery = new Grocery(body)

    if (!grocery) {
        return res.status(400).json({ success: false, error: err })
    }

    grocery
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: grocery._id,
                message: 'Grocery created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Grocery not created!',
            })
        })
}

updateGrocery = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    Grocery.findOne({ _id: req.params.id }, (err, grocery) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Grocery not found!',
            })
        }
        grocery.name = body.name
        grocery.quantity = body.quantity
        grocery.unit = body.unit
        grocery.time = body.time
        grocery
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: grocery._id,
                    message: 'Grocery updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Grocery not updated!',
                })
            })
    })
}

deleteGrocery = async (req, res) => {
    await Grocery.findOneAndDelete({ _id: req.params.id }, (err, grocery) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!grocery) {
            return res
                .status(404)
                .json({ success: false, error: `Grocery not found` })
        }

        return res.status(200).json({ success: true, data: grocery })
    }).catch(err => console.log(err))
}

getGroceryById = async (req, res) => {
    await Grocery.findOne({ _id: req.params.id }, (err, grocery) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!grocery) {
            return res
                .status(404)
                .json({ success: false, error: `Grocery not found` })
        }
        return res.status(200).json({ success: true, data: grocery })
    }).catch(err => console.log(err))
}

getGroceries = async (req, res) => {
    await Grocery.find({}, (err, groceries) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!groceries.length) {
            return res
                .status(404)
                .json({ success: false, error: `Grocery not found` })
        }
        return res.status(200).json({ success: true, data: groceries })
    }).catch(err => console.log(err))
}

module.exports = {
    createGrocery,
    updateGrocery,
    deleteGrocery,
    getGroceries,
    getGroceryById,
}