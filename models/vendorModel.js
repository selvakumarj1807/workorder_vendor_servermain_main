const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const vendorShema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter name']
    },
    email: {
        type: String,
        required: [true, 'Please enter email'],
        unique: true,
        validate: [validator.isEmail, 'Pls enter a valid email address']
    },
    password: {
        type: String,
        required: [true, 'Pls enter Password'],
        maxlength: [8, 'Password cannot exceed 8 charecters'],
        select: false
    },
    avatar: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'vendor'
    },
    resetPasswordToken: String,
    resetPasswordTokenExpire: Date,
    createdAt: {
        type: Date,
        default: Date.now
    }
})

vendorShema.pre('save', async function (next) {
    this.password = await bcrypt.hash(this.password, 10)
})

vendorShema.methods.getJwtToken = function () {
    return jwt.sign({ id: this.id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_TIME
    })
}

vendorShema.methods.isValidPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

let model = mongoose.model('vendor', vendorShema);

module.exports = model;