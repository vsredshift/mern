const express = require('express')
const router = express.Router()

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
// @access  Public
router.post('/', (req, res) => {
    const newProduct = new Product({
        name: req.body.name,
        simNumber: req.body.simNumber
    })

    newProduct.save().then(product => res.json(product))
})


// @route   DELETE api/products/{id}
// @desc    Delete a product
// @access  Public
router.delete('/:id', (req, res) => {
    Product.findById(req.params.id)
        .then(product => product.remove().then(() => res.json({success: true})))
        .catch(err => res.status(404).json({success: false}))
})



module.exports = router
