const express = require('express');
const router = express.Router();
const donationController = require('../controllers/donationController');

router.get('/donate', donationController.renderDonationPage);
router.post('/api/submit-donation', donationController.submitDonation);
router.post('/api/confirm-donation', donationController.submitDonation); // Alias for compatibility
router.get('/download-receipt/:receiptNo', donationController.downloadDonationReceipt);

module.exports = router;
