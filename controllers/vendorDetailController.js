
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middlewares/catchAsyncError');
const APIFeatures = require('../utils/apiFeatures');
const VendorDetail = require("../models/vendorDetailModel")

const mongoose = require('mongoose');
//get products - /api/v1/vendorDetails
exports.getVendorDetails = async (req, res, next) => {
     const apiFeatures = new APIFeatures(VendorDetail.find(), req.query).search().filter();
    const vendorDetails = await apiFeatures.query;
    res.status(200).json({
        success: true,
        vendorDetails
    })
}


//create vendorDetail - /api/v1/vendorDetail/new
exports.newVendorDetail = catchAsyncError(async(req,res,next) => {
   const vendorDetail = await VendorDetail.create(req.body);
   res.status(201).json({
    success: true,
    vendorDetail
   })

})



//update product - /vendorDetail/:id
exports.updateVendorDetail = async (req, res, next) => {
    let vendorDetail = await VendorDetail.findById(req.params.id);

    if (!vendorDetail) {
        return res.status(404).json({
            success: false,
            message: "Vendor-Detail not found"
        });
    }

    vendorDetail = await VendorDetail.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    })

    res.status(200).json({
        success: true,
        vendorDetail
    })
}


// delete product - /api/v1/product/:id
// exports.deleteProduct = async (req, res, next) => {
//     try {
//         const product = await Product.findByIdAndDelete(req.params.id);

//         if (!product) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Product not found"
//             });
//         }

//         res.status(200).json({
//             success: true,
//             message: "Product Deleted!"
//         });
//     } catch (error) {
//         return res.status(500).json({
//             success: false,
//             message: "Server Error"
//         });
//     }
// }