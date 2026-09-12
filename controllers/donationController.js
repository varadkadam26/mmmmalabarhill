const db = require('../config/db');
const twilio = require('../config/twilio');
const pdfController = require('./pdfController');
const mailer = require('../config/mailer');
const googleSheets = require('../config/googleSheets');

module.exports = {
  // Render Donation Page
  renderDonationPage(req, res) {
    res.render('donate', {
      title: 'Online Donation Portal (80G Tax Exempt) | Malabar Hill Cha Raja',
      metaDescription: 'Support Shree Bal Gopal Ganeshutsav Mandal\'s social service and festival initiatives. 80G tax-exempt online donations with direct bank/UPI verification and official PDF receipts.',
      activeTab: 'donate'
    });
  },

  // Submit Donation (Pending Admin Approval)
  async submitDonation(req, res) {
    try {
      const { donor_name, phone, email, amount, payment_utr } = req.body;

      if (!donor_name || !phone || !amount || !payment_utr) {
        return res.status(400).json({
          success: false,
          message: 'कृपया नाव, मोबाईल नंबर, देणगी रक्कम आणि पेमेंट UTR नंबर प्रविष्ट करा.'
        });
      }

      const numAmount = parseFloat(amount);
      if (isNaN(numAmount) || numAmount <= 0) {
        return res.status(400).json({
          success: false,
          message: 'कृपया वैध देणगी रक्कम प्रविष्ट करा.'
        });
      }

      const donationData = {
        receipt_no: `MCC-REC-2026-${Math.floor(100 + Math.random() * 900)}`,
        donor_name: donor_name.trim(),
        phone: phone.trim(),
        email: (email || '').trim(),
        amount: numAmount,
        category: 'General Mandal Seva',
        payment_id: payment_utr.trim(),
        order_id: `utr_${Date.now()}`,
        payment_utr: payment_utr.trim(),
        pan_number: 'N/A',
        status: 'PENDING_APPROVAL'
      };

      const createdDonation = await db.createDonation(donationData);
      db.addLog('DONATION_SUBMIT', `Pending Donation submitted: ₹${createdDonation.amount} from ${createdDonation.donor_name} (UTR: ${payment_utr})`);

      // Sync to Google Sheets
      try {
        await googleSheets.appendDonation(createdDonation);
      } catch (err) {
        console.error('Google Sheets donation sync error:', err.message);
      }

      res.json({
        success: true,
        receipt_no: createdDonation.receipt_no,
        message: 'तुमची देणगी नोंदणी यशस्वी झाली आहे! मंडळाच्या पडताळणीनंतर (Admin Approval) अधिकृत ८०जी PDF पावती तुमच्या ईमेलवर पाठवली जाईल.'
      });
    } catch (err) {
      console.error('Submit donation error:', err);
      res.status(500).json({ success: false, message: 'देणगी नोंदवताना त्रुटी आली. कृपया पुन्हा प्रयत्न करा.' });
    }
  },

  // Approve Donation (Admin Action) & Send PDF Email
  async approveDonation(req, res) {
    try {
      const { receiptNo } = req.params;
      const donation = await db.getDonationByReceipt(receiptNo);

      if (!donation) {
        return res.status(404).json({ success: false, message: 'Donation record not found.' });
      }

      donation.status = 'SUCCESS';
      await db.updateDonationStatus(receiptNo, 'SUCCESS');

      db.addLog('DONATION_APPROVE', `Donation ${receiptNo} approved by Admin for ${donation.donor_name}.`);

      // Generate PDF buffer
      let pdfBuffer = null;
      try {
        pdfBuffer = await pdfController.generateDonationPDFBuffer(donation);
      } catch (err) {
        console.error('Failed to generate PDF buffer:', err.message);
      }

      // Send email if donor email exists and pdfBuffer generated
      let emailSent = false;
      if (donation.email && pdfBuffer) {
        emailSent = await mailer.sendDonationApprovalEmail(donation, pdfBuffer);
      }

      // SMS notification via Twilio
      twilio.sendDonationReceiptSMS(donation).catch(err => console.error('SMS error:', err.message));

      res.json({
        success: true,
        receipt_no: donation.receipt_no,
        email_sent: emailSent,
        message: emailSent
          ? 'देणगी पावती यशस्वीरित्या मंजूर करण्यात आली आहे व ईमेलवर पाठवली आहे.'
          : 'देणगी मंजूर करण्यात आली आहे.'
      });
    } catch (err) {
      console.error('Approve donation error:', err);
      res.status(500).json({ success: false, message: 'देणगी मंजूर करताना त्रुटी आली.' });
    }
  },

  // Download 80G PDF Receipt
  async downloadDonationReceipt(req, res) {
    const { receiptNo } = req.params;
    const donation = await db.getDonationByReceipt(receiptNo);

    if (!donation) {
      return res.status(404).send('Donation receipt not found.');
    }

    pdfController.generateDonationPDF(donation, res);
  }
};
