const express = require('express');
const router = express.Router();
const yatraController = require('../controllers/yatraController');
const tshirtController = require('../controllers/tshirtController');
const contactController = require('../controllers/contactController');

// Home & About Routes
router.get('/', yatraController.renderHomePage);
router.get('/about', yatraController.renderAboutPage);

// Festival Schedule & API Routes
router.get('/schedule', yatraController.renderSchedulePage);
router.get('/api/live-status', yatraController.getLiveStatusApi);

// Glimpses & Decade Gallery Combined
router.get('/glimpses', yatraController.renderGlimpsesPage);
router.get('/photo-booth', (req, res) => res.redirect(301, '/glimpses'));

// Social Work Page (Separate Page & Photos)
router.get('/social-work', yatraController.renderSocialWorkPage);

// Executive Committee Page (Public - Separate from Admin Login)
router.get('/committee', yatraController.renderCommitteePage);

// Advertisement Page
router.get('/advertisement', (req, res) => {
  res.render('advertisement', {
    title: 'Sponsorship & Souvenir Advertisement | Malabar Hill Cha Raja',
    metaDescription: 'Partner with Malabar Hill Cha Raja for Ganeshotsav souvenir advertisements, banner sponsorships, and digital brand visibility reaching lakhs of devotees.',
    activeTab: 'advertisement'
  });
});

// Contact Us Page (With Embedded Google Maps)
router.get('/contact', (req, res) => {
  res.render('contact', {
    title: 'Contact Us & Mandap Location | Malabar Hill Cha Raja',
    metaDescription: 'Get in touch with Shree Bal Gopal Ganeshutsav Mandal. Mandap address: Ganesh Chowk, Bhaji Galli, Grant Road (W), Mumbai - 400007. Phone, email, and Google Maps directions.',
    activeTab: 'contact'
  });
});
router.post('/contact/submit', contactController.submitContactForm);

// Official T-Shirt Booking Routes (Renamed from Tshirt Store)
router.get('/tshirt', tshirtController.renderTshirtPage);
router.post('/tshirt/create-order', tshirtController.createPaymentOrder);
router.post('/tshirt/confirm', tshirtController.confirmTshirtOrder);
router.get('/download-tshirt-receipt/:receiptNo', tshirtController.downloadTshirtReceipt);

module.exports = router;
