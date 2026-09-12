const db = require('../config/db');
const twilio = require('../config/twilio');
const pdfController = require('./pdfController');
const googleSheets = require('../config/googleSheets');

module.exports = {
  // Render Official T-Shirt Store Page
  renderTshirtPage(req, res) {
    res.render('tshirt', {
      title: 'Official Mandal T-Shirt Booking | Malabar Hill Cha Raja',
      metaDescription: 'Book official Malabar Hill Cha Raja Ganeshotsav T-shirts online with instant receipt generation. Show your devotion and support mandal cultural activities.',
      activeTab: 'tshirt'
    });
  },

  // Confirm T-Shirt Purchase & Save Order Record
  async confirmTshirtOrder(req, res) {
    try {
      const {
        buyer_name, phone, email, size, color, quantity, total_amount, address, payment_id
      } = req.body;

      if (!buyer_name || !phone || !size || !color || !quantity || !total_amount) {
        return res.status(400).json({ success: false, message: 'कृपया नाव, मोबाईल नंबर, साईझ आणि संख्या प्रविष्ट करा.' });
      }

      const receiptNo = `MHR-TSHIRT-2026-${Math.floor(100 + Math.random() * 900)}`;

      const orderData = {
        receipt_no: receiptNo,
        buyer_name: buyer_name.trim(),
        phone: phone.trim(),
        email: (email || '').trim(),
        size,
        color,
        quantity: parseInt(quantity, 10),
        total_amount: parseFloat(total_amount),
        address: (address || 'Mandap Counter Pickup').trim(),
        payment_id: payment_id || `pay_tshirt_${Date.now()}`,
        status: 'SUCCESS'
      };

      const createdOrder = await db.createTshirtOrder(orderData);
      db.addLog('TSHIRT', `New T-Shirt order: ${createdOrder.quantity}x (${createdOrder.size}, ${createdOrder.color}) by ${createdOrder.buyer_name}`);

      // Sync to Google Sheets
      try {
        await googleSheets.appendTshirtBooking(createdOrder);
      } catch (err) {
        console.error('Google Sheets tshirt sync error:', err.message);
      }

      // Dispatch SMS notification via Twilio
      twilio.sendTshirtReceiptSMS(createdOrder).catch(err => console.error('T-Shirt SMS error:', err));

      res.json({
        success: true,
        receipt_no: createdOrder.receipt_no,
        message: 'T-Shirt order successfully booked!'
      });
    } catch (err) {
      console.error('Confirm tshirt order error:', err);
      res.status(500).json({ success: false, message: 'Error recording T-Shirt booking.' });
    }
  },

  // Download T-Shirt Booking Token PDF
  async downloadTshirtReceipt(req, res) {
    const { receiptNo } = req.params;
    const order = await db.getTshirtOrderByReceipt(receiptNo);

    if (!order) {
      return res.status(404).send('T-Shirt booking receipt not found.');
    }

    pdfController.generateTshirtPDF(order, res);
  }
};
