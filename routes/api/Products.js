const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')

// Product Model
const Product = require('../../models/Product')

// @route   GET api/products
// @desc    Get all products
// @access  Public
router.get('/', (req, res) => {
    Product.find()
        .sort({ date: -1 })
        .then(products => res.json(products))
})
    


// @route   POST api/products
// @desc    Create a product
// @access  Private
router.post('/', auth, (req, res) => {
    const newProduct = new Product({
        name: req.body.name,
        simNumber: req.body.simNumber
    })

    newProduct.save().then(product => res.json(product))
})


// @route   DELETE api/products/{id}
// @desc    Delete a product
// @access  Private
router.delete('/:id', auth, (req, res) => {
    Product.findById(req.params.id)
        .then(product => product.remove().then(() => res.json({success: true})))
        .catch(err => res.status(404).json({success: false}))
})



module.exports = router
