const express = require('express');
const router = express.Router();
const { isAuthenticateVendor } = require('../middlewares/authenticate');
const { newVendorDetail, getVendorDetails, updateVendorDetail } = require('../controllers/vendorDetailController');

router.route('/vendorDetails').get(isAuthenticateVendor, getVendorDetails);
router.route('/vendorDetail/new').post(newVendorDetail);
router.route('/vendorDetail/:id').put(updateVendorDetail);

module.exports = router;