const express = require('express');
const { registerVendor, logoutVendor } = require('../controllers/authController');
const { loginVendor } = require('../controllers/authController')
const router = express.Router();

router.route('/register').post(registerVendor);
router.route('/login').post(loginVendor);
router.route('/logout').get(logoutVendor);

module.exports = router;