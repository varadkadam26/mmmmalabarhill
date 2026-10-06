// Twilio integration disabled as per user request
module.exports = {
  async sendSMS() { return { success: true, disabled: true }; },
  async sendPassConfirmation() { return { success: true, disabled: true }; },
  async sendDonationReceiptSMS() { return { success: true, disabled: true }; },
  async sendTshirtReceiptSMS() { return { success: true, disabled: true }; }
};
