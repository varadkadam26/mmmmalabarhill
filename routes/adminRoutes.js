const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const donationController = require('../controllers/donationController');
const tshirtController = require('../controllers/tshirtController');

// Public Admin Auth Routes
router.get('/admin/login', adminController.renderLoginPage);
router.post('/admin/login', adminController.handleLogin);
router.get('/admin/logout', adminController.handleLogout);

// Protected Admin Dashboard Routes
router.get('/admin', adminController.requireAuth, adminController.renderDashboard);
router.post('/admin/api/verify-pass', adminController.requireAuth, adminController.verifyPassApi);
router.post('/admin/broadcast-sms', adminController.requireAuth, adminController.sendBroadcastSMS);
router.post('/admin/api/clear-all-data', adminController.requireAuth, adminController.clearAllDataApi);
router.post('/admin/api/approve-donation/:receiptNo', adminController.requireAuth, donationController.approveDonation);
router.post('/admin/api/approve-tshirt/:receiptNo', adminController.requireAuth, tshirtController.approveTshirtOrder);

module.exports = router;
