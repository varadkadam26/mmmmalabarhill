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

/**
 * Send donation approval email with attached PDF receipt to donor
 */
async function sendDonationApprovalEmail(donation, pdfBuffer) {
  if (!transporter) {
    console.log('⚠️ SMTP transporter not available — skipping email.');
    return false;
  }

  const donorEmail = (donation.email || '').trim();
  if (!donorEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(donorEmail)) {
    console.log('⚠️ Invalid or missing donor email — skipping email dispatch.');
    return false;
  }

  const htmlBody = `
    <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 2px solid #C0972D; border-radius: 12px; overflow: hidden;">
      <div style="background: linear-gradient(135deg, #800020, #5C0015); padding: 24px; text-align: center;">
        <h2 style="color: #F5D98E; margin: 0; font-size: 22px;">🌺 देणगी पावती मंजूर करण्यात आली आहे!</h2>
        <p style="color: #E8C86E; margin: 6px 0 0; font-size: 14px;">Donation Approved & 80G Receipt — Malabar Hill Cha Raja</p>
      </div>
      <div style="padding: 28px; background: #FFF9F0;">
        <p style="font-size: 16px; color: #800020; font-weight: 700; margin-top: 0;">जय गणेश! सस्नेह नमस्कार ${donation.donor_name},</p>
        <p style="color: #333; line-height: 1.6;">श्री बाल गोपाल गणेशोत्सव मंडळाला आपण दिलेल्या <strong>₹ ${parseFloat(donation.amount).toLocaleString('en-IN')}</strong> च्या देणगीची यशस्वी पडताळणी झाली असून आपली अधिकृत ८०जी कर सवलत पावती या ईमेलसोबत जोडलेली (Attached) आहे.</p>
        
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0; background: #FFFFFF; border: 1px solid #E8C86E; border-radius: 8px;">
          <tr>
            <td style="padding: 10px 12px; font-weight: 700; color: #800020; width: 140px;">पावती क्र. / Receipt No:</td>
            <td style="padding: 10px 12px; color: #333; font-weight: 700;">${donation.receipt_no}</td>
          </tr>
          <tr style="background: #FEF3E2;">
            <td style="padding: 10px 12px; font-weight: 700; color: #800020;">देणगीदार / Donor:</td>
            <td style="padding: 10px 12px; color: #333;">${donation.donor_name}</td>
          </tr>
          <tr>
            <td style="padding: 10px 12px; font-weight: 700; color: #800020;">रक्कम / Amount:</td>
            <td style="padding: 10px 12px; color: #800020; font-size: 18px; font-weight: 800;">₹ ${parseFloat(donation.amount).toLocaleString('en-IN')}</td>
          </tr>
          <tr style="background: #FEF3E2;">
            <td style="padding: 10px 12px; font-weight: 700; color: #800020;">UTR No / Ref:</td>
            <td style="padding: 10px 12px; color: #333; font-family: monospace;">${donation.payment_id || donation.payment_utr || 'N/A'}</td>
          </tr>
        </table>

        <p style="color: #555; font-size: 14px; line-height: 1.6;">बाप्पाचा आशीर्वाद आपल्या व आपल्या कुटुंबावर सदैव राहो हीच श्रींच्या चरणी प्रार्थना! 🙏</p>
      </div>
      <div style="background: #800020; padding: 14px; text-align: center;">
        <p style="color: #E8C86E; margin: 0; font-size: 12px;">श्री बाल गोपाल गणेशोत्सव मंडळ | Malabar Hill Cha Raja | गणपती बाप्पा मोरया 🙏</p>
      </div>
    </div>
  `;

  const mailOptions = {
    from: `"Malabar Hill Cha Raja" <${SMTP_USER}>`,
    to: donorEmail,
    subject: `देणगी पावती (80G Receipt) — ${donation.receipt_no} | Malabar Hill Cha Raja`,
    html: htmlBody,
    attachments: [
      {
        filename: `MalabarHillChaRaja_Receipt_${donation.receipt_no}.pdf`,
        content: pdfBuffer,
        contentType: 'application/pdf'
      }
    ]
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ Donation approval email sent to ${donorEmail}: ${info.messageId}`);
    return true;
  } catch (err) {
    console.error(`⚠️ Failed to send donation email to ${donorEmail}:`, err.message);
    return false;
  }
}

module.exports = {
  sendContactEmail,
  sendDonationApprovalEmail
};
