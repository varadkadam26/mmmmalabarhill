const db = require('../config/db');
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

  // Confirm T-Shirt Purchase & Save Order Record (Pending Admin Approval)
  async confirmTshirtOrder(req, res) {
    try {
      const {
        buyer_name, phone, email, size, color, quantity, total_amount, address, payment_id
      } = req.body;

      const parsedQty = parseInt(quantity, 10) || 1;
      const parsedAmount = parseFloat(total_amount) || (parsedQty * 350);

      if (!buyer_name || !phone || !size || !color || !payment_id) {
        return res.status(400).json({
          success: false,
          message: 'कृपया नाव, मोबाईल नंबर, साईझ, संख्या आणि पेमेंट UTR / व्यवहार क्रमांक प्रविष्ट करा.'
        });
      }

      const receiptNo = `MHR-TSHIRT-2026-${Math.floor(100 + Math.random() * 900)}`;

      const orderData = {
        receipt_no: receiptNo,
        buyer_name: buyer_name.trim(),
        phone: phone.trim(),
        email: (email || '').trim(),
        size,
        color,
        quantity: parsedQty,
        total_amount: parsedAmount,
        address: (address || 'Mandap Counter Pickup').trim(),
        payment_id: payment_id.trim(),
        status: 'PENDING'
      };

      const createdOrder = await db.createTshirtOrder(orderData);
      db.addLog('TSHIRT', `New pending T-Shirt order: ${createdOrder.quantity}x (${createdOrder.size}, ${createdOrder.color}) by ${createdOrder.buyer_name} (UTR: ${payment_id})`);

      // Sync to Google Sheets
      try {
        await googleSheets.appendTshirtBooking(createdOrder);
      } catch (err) {
        console.error('Google Sheets tshirt sync error:', err.message);
      }

      res.json({
        success: true,
        receipt_no: createdOrder.receipt_no,
        message: 'तुमची टी-शर्ट बुकिंग नोंदणी यशस्वी झाली आहे! मंडळाच्या बँक पडताळणीनंतर (Admin Approval) अधिकृत टी-शर्ट पावती उपलब्ध होईल.'
      });
    } catch (err) {
      console.error('Confirm tshirt order error:', err);
      res.status(500).json({ success: false, message: 'टी-शर्ट बुकिंग नोंदवताना त्रुटी आली. कृपया पुन्हा प्रयत्न करा.' });
    }
  },

  // Approve T-Shirt Order (Admin Action)
  async approveTshirtOrder(req, res) {
    try {
      const { receiptNo } = req.params;
      const order = await db.getTshirtOrderByReceipt(receiptNo);

      if (!order) {
        return res.status(404).json({ success: false, message: 'T-Shirt order record not found.' });
      }

      order.status = 'SUCCESS';
      await db.updateTshirtOrderStatus(receiptNo, 'SUCCESS');

      db.addLog('TSHIRT_APPROVE', `T-Shirt order ${receiptNo} approved by Admin for ${order.buyer_name}.`);

      res.json({
        success: true,
        receipt_no: order.receipt_no,
        message: 'टी-शर्ट बुकिंग पावती यशस्वीरित्या मंजूर करण्यात आली आहे.'
      });
    } catch (err) {
      console.error('Approve tshirt order error:', err);
      res.status(500).json({ success: false, message: 'टी-शर्ट बुकिंग मंजूर करताना त्रुटी आली.' });
    }
  },

  // Download T-Shirt Booking Token PDF
  async downloadTshirtReceipt(req, res) {
    const { receiptNo } = req.params;
    const order = await db.getTshirtOrderByReceipt(receiptNo);

    if (!order) {
      return res.status(404).send('T-Shirt booking receipt not found.');
    }

    if (order.status === 'PENDING' || order.status === 'PENDING_APPROVAL') {
      return res.status(403).send(`
        <!DOCTYPE html>
        <html lang="mr">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>पावती पडताळणी प्रलंबित | Malabar Hill Cha Raja</title>
          <link href="https://fonts.googleapis.com/css2?family=Yashomudra&family=Inter:wght@400;600;700;800&display=swap" rel="stylesheet">
          <style>
            body { font-family: 'Inter', sans-serif; background: #FFF8F0; color: #1E293B; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; padding: 1.5rem; text-align: center; }
            .card { background: #FFFFFF; border: 2px solid #D4AF37; border-radius: 16px; max-width: 500px; padding: 2.5rem; box-shadow: 0 10px 30px rgba(0,0,0,0.1); }
            h2 { color: #800020; font-size: 1.5rem; margin-bottom: 1rem; }
            p { color: #475569; line-height: 1.6; margin-bottom: 1.5rem; }
            .badge { background: #FEF3C7; color: #D97706; padding: 8px 16px; border-radius: 20px; font-weight: bold; font-size: 0.9rem; display: inline-block; margin-bottom: 1.5rem; }
            a { display: inline-block; background: #800020; color: #FFF; padding: 10px 24px; border-radius: 8px; text-decoration: none; font-weight: bold; }
          </style>
        </head>
        <body>
          <div class="card">
            <div class="badge">⏳ पडताळणी प्रलंबित (Pending Admin Approval)</div>
            <h2>टी-शर्ट बुकिंग पावती प्रलंबित आहे</h2>
            <p>पावती क्रमांक: <strong>${order.receipt_no}</strong><br>पेमेंट UTR: <strong>${order.payment_id}</strong></p>
            <p>मंडळाच्या बँक पडताळणीनंतर (Admin Approval) तुमची अधिकृत बुकिंग पावती येथून डाउनलोड करण्यासाठी उपलब्ध होईल.</p>
            <a href="/tshirt">मुख्य बुकिंग पानावर जा</a>
          </div>
        </body>
        </html>
      `);
    }

    pdfController.generateTshirtPDF(order, res);
  }
};
