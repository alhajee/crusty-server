const Grocery = require('../models/grocery-model')


createGrocery = (req, res) => {
/*
    Creates new groceries and saves them 
    in the database
*/
    const body = req.body



    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a grocery',
        })
    }

    // create a new grocery object
    const grocery = new Grocery({
        name: body.name,
        quantity: body.quantity,
        unit: body.unit,
        price: body.price
    })

    // return an error if grocery object was not created
    if (!grocery) {
        return res.status(400).json({ success: false, error: err })
    }

    // save grocery to database or return an error
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
/*
    Update all fields in a groceries and saves them 
    in the database
*/
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
        grocery.price = body.price

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


patchGrocery = async (req, res) => {
    /*
        Patch (inclusive update) only the provided fields in a groceries 
        and saves them in the database
    */
        const body = req.body
    
        if (!body) {
            return res.status(400).json({
                success: false,
                error: 'You must provide a body to patch',
            })
        }
    
        Grocery.findOne({ _id: req.params.id }, (err, grocery) => {
            if (err) {
                return res.status(404).json({
                    err,
                    message: 'Grocery not found!',
                })
            }
            
            // update the fields that were provided
            grocery.set(body)

            grocery
                .save()
                .then(() => {
                    return res.status(200).json({
                        success: true,
                        id: grocery._id,
                        message: 'Grocery patched!',
                    })
                })
                .catch(error => {
                    return res.status(404).json({
                        error,
                        message: 'Grocery not patched!',
                    })
                })
        })
    }

    
deleteGrocery = async (req, res) => {
/*
    Delete a single grocery from the database
*/
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
/*
    Get a single grocery object by its ID
*/
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
/*
    Get all groceries from the database
*/
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
    patchGrocery,
    deleteGrocery,
    getGroceries,
    getGroceryById,
}