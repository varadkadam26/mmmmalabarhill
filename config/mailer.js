const nodemailer = require('nodemailer');
require('dotenv').config();

const SMTP_USER = process.env.SMTP_USER || 'mitramsolutions@gmail.com';
const SMTP_APP_PASSWORD = process.env.SMTP_APP_PASSWORD || '';

let transporter = null;

try {
  if (SMTP_USER && SMTP_APP_PASSWORD) {
    transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: SMTP_USER,
        pass: SMTP_APP_PASSWORD
      }
    });
    console.log('✅ Gmail SMTP transporter configured.');
  } else {
    console.log('⚠️ SMTP credentials not set in .env — email sending disabled.');
  }
} catch (err) {
  console.error('⚠️ SMTP transporter creation error:', err.message);
}

/**
 * Send contact form inquiry email
 * From: mitramsolutions@gmail.com
 * To: marketing.malabarhillcharaja@gmail.com & mcrofficial1973@gmail.com
 * CC: user's email (if provided)
 */
async function sendContactEmail({ name, email, contact, message }) {
  if (!transporter) {
    console.log('⚠️ SMTP transporter not available — skipping email.');
    return false;
  }

  const userEmail = (email || contact || '').trim();

  const toAddresses = [
    'marketing.malabarhillcharaja@gmail.com',
    'mcrofficial1973@gmail.com',
    SMTP_USER
  ];

  // Check if userEmail looks like a valid email for CC
  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userEmail);
  const ccList = isEmail ? [userEmail] : [];

  const htmlBody = `
    <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 2px solid #C0972D; border-radius: 12px; overflow: hidden;">
      <div style="background: linear-gradient(135deg, #800020, #5C0015); padding: 24px; text-align: center;">
        <h2 style="color: #F5D98E; margin: 0; font-size: 22px;">🙏 नवीन संपर्क संदेश</h2>
        <p style="color: #E8C86E; margin: 6px 0 0; font-size: 14px;">New Contact Inquiry — Malabar Hill Cha Raja</p>
      </div>
      <div style="padding: 28px; background: #FFF9F0;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 10px 12px; font-weight: 700; color: #800020; width: 140px; vertical-align: top;">नाव / Name:</td>
            <td style="padding: 10px 12px; color: #333;">${name}</td>
          </tr>
          <tr style="background: #FEF3E2;">
            <td style="padding: 10px 12px; font-weight: 700; color: #800020; vertical-align: top;">ईमेल / Email:</td>
            <td style="padding: 10px 12px; color: #333;">${userEmail}</td>
          </tr>
          <tr>
            <td style="padding: 10px 12px; font-weight: 700; color: #800020; vertical-align: top;">संदेश / Message:</td>
            <td style="padding: 10px 12px; color: #333; line-height: 1.6;">${message.replace(/\n/g, '<br>')}</td>
          </tr>
        </table>
      </div>
      <div style="background: #800020; padding: 14px; text-align: center;">
        <p style="color: #E8C86E; margin: 0; font-size: 12px;">श्री बाल गोपाल गणेशोत्सव मंडळ | Malabar Hill Cha Raja | गणपती बाप्पा मोरया 🙏</p>
      </div>
    </div>
  `;

  const mailOptions = {
    from: `"Malabar Hill Cha Raja" <${SMTP_USER}>`,
    to: toAddresses.join(', '),
    cc: ccList.length ? ccList.join(', ') : undefined,
    subject: `नवीन संपर्क संदेश — ${name} | Malabar Hill Cha Raja`,
    html: htmlBody
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ Contact email sent: ${info.messageId}`);
    return true;
  } catch (err) {
    console.error('⚠️ Failed to send contact email:', err.message);
    return false;
  }
}

module.exports = {
  sendContactEmail
};
