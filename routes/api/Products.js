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
    

module.exports = router
