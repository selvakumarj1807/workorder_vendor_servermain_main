const { request } = require('express');
const mongoose = require('mongoose');

const VendorDetailSchema = new mongoose.Schema({
    businessName: {
        type: String,
        required: [true, "Pls enter the Business name"],
        trim: true,
        maxLength: [100, "Business name cannot exceed 100 charecters"]
    },
    companyName: {
        type: String,
        required: [true, "Pls enter the company name"],
        trim: true,
        maxLength: [100, "Company name cannot exceed 100 charecters"]
    },
    streetAddress : {
        type:String,
        required:true
    },
    streetAddressLine2 : {
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true
    },
    phoneNo : {
        type:Number,
        required:true
    },
    postalCode:{
        type:Number,
        required:true
    },
    bankName: {
        type: String,
        required: [true, "Pls enter the Bank name"],
        trim: true,
        maxLength: [100, "Bank name cannot exceed 100 charecters"]
    },
    brachName: {
        type: String,
        required: [true, "Pls enter the Branch name"],
        trim: true,
        maxLength: [100, "Branch name cannot exceed 100 charecters"]
    },
    accounterName: {
        type: String,
        required: [true, "Pls enter the accounter name"],
        trim: true,
        maxLength: [100, "accounter name cannot exceed 100 charecters"]
    },
    accountNumber: {
        type: String,
        required: [true, "Pls enter the Accounter Number"],
        trim: true,
        maxLength: [100, "Accounter Number cannot exceed 100 charecters"]
    },
    ifscCode: {
        type: String,
        required: [true, "Pls enter the IFSC code"],
        trim: true,
        maxLength: [100, "IFSC code cannot exceed 100 charecters"]
    },
    upiId : {
        type:String
    }
})

let schema = mongoose.model('VendorDetail', VendorDetailSchema);

module.exports = schema;