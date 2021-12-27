const express = require('express')

const GroceryCtrl = require('../controllers/grocery-ctrl')

const router = express.Router()

router.post('/grocery', GroceryCtrl.createGrocery)
router.put('/grocery/:id', GroceryCtrl.updateGrocery)
router.patch('/grocery/:id', GroceryCtrl.patchGrocery)
router.delete('/grocery/:id', GroceryCtrl.deleteGrocery)
router.get('/grocery/:id', GroceryCtrl.getGroceryById)
router.get('/groceries', GroceryCtrl.getGroceries)

module.exports = router