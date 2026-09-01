const mailer = require('../config/mailer');
const googleSheets = require('../config/googleSheets');

module.exports = {
  /**
   * Handle contact form submission
   * POST /contact/submit
   */
  async submitContactForm(req, res) {
    try {
      const { name, email, contact, message } = req.body;
      const userEmail = (email || contact || '').trim();

      if (!name || !userEmail || !message) {
        return res.status(400).json({
          success: false,
          message: 'कृपया ईमेल पत्ता व सर्व आवश्यक माहिती भरा. (Please enter your email and fill all required fields.)'
        });
      }

      const contactData = {
        name: name.trim(),
        email: userEmail,
        contact: userEmail,
        message: message.trim()
      };

      // Send email and append to Google Sheets concurrently
      await Promise.allSettled([
        mailer.sendContactEmail(contactData),
        googleSheets.appendContactInquiry(contactData)
      ]);

      res.json({
        success: true,
        message: 'तुमचा संदेश यशस्वीरित्या पाठवला गेला आहे! मंडळ प्रतिनिधी लवकरच संपर्क करतील.'
      });
    } catch (err) {
      console.error('Contact form submission error:', err);
      res.status(500).json({
        success: false,
        message: 'संदेश पाठवताना त्रुटी आली. कृपया पुन्हा प्रयत्न करा.'
      });
    }
  }
};
