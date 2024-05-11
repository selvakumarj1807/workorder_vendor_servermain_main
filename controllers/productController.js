const Product = require('../models/productModel');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middlewares/catchAsyncError');
const APIFeatures = require('../utils/apiFeatures');


//get products - /api/v1/products
exports.getProducts = async (req, res, next) => {
    // const resPerPage = 2;
    // const apiFeatures = new APIFeatures(Product.find(), req.query).search().filter().paginate(resPerPage);
    const apiFeatures = new APIFeatures(Product.find(), req.query).search().filter();

    const products = await apiFeatures.query;
    res.status(200).json({
        success: true,
        count: products.length,
        products
    })
}

//create product - /api/v1/product/new
exports.newProduct = catchAsyncError(async (req, res, next) => {
    const product = await Product.create(req.body);
    res.status(201).json({
        success: true,
        product
    })
});

//get single product - /api/v1/product/:id
const mongoose = require('mongoose');

exports.getSingleProduct = async (req, res, next) => {
    try {
        const isValidObjectId = mongoose.Types.ObjectId.isValid(req.params.id);
        if (!isValidObjectId) {
            return next(new ErrorHandler(`Resource not found: ${req.params.id}`, 400));
        }

        const product = await Product.findById(req.params.id);

        if (!product) {
            return next(new ErrorHandler('Product not found', 404));
        }

        res.status(200).json({
            success: true,
            product
        });
    } catch (err) {
        next(err);
    }
};


//update product - /api/v1/product/:id
exports.updateProduct = async (req, res, next) => {
    let product = await Product.findById(req.params.id);

    if (!product) {
        return res.status(404).json({
            success: false,
            message: "Product not found"
        });
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    })

    res.status(200).json({
        success: true,
        product
    })
}


// delete product - /api/v1/product/:id
exports.deleteProduct = async (req, res, next) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Product Deleted!"
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
}