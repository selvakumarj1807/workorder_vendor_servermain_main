const catchAsyncError = require('../middlewares/catchAsyncError');
const Vendor = require('../models/vendorModel');
const ErrorHandler = require('../utils/errorHandler');
const sendToken = require('../utils/jwt')

exports.registerVendor = catchAsyncError(async (req, res, next) => {
    const { name, email, password, avatar } = req.body;
    const vendor = await Vendor.create({
        name,
        email,
        password,
        avatar
    });

    sendToken(vendor, 201, res);
});

//Login vendor
exports.loginVendor = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body

    if (!email || !password) {
        return next(new ErrorHandler('Please enter email & password', 400));
    }

    //finding the vendor database
    const vendor = await Vendor.findOne({ email }).select('+password')

    if (!vendor) {
        return next(new ErrorHandler('Invalid email or password ', 401));
    }

    if (!await vendor.isValidPassword(password)) {
        return next(new ErrorHandler('Invalid email or password', 401));
    }

    sendToken(vendor, 201, res);

})

exports.logoutVendor = (req, res, next) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })
    .status(200)
    .json({
        success: true,
        message: "LoggedOut"
    })
}