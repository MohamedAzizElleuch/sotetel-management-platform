// server/utils/sendInvoiceEmail.js

const nodemailer = require('nodemailer');
const path = require('path');
const fs = require('fs');

const sendInvoiceEmail = async ({ to, clientName, invoiceId, pdfFileName, isPaid = false }) => {
  const pdfPath = path.join(__dirname, '..', 'invoices', pdfFileName || `invoice_${invoiceId}.pdf`);

  console.log('Attempting to send email...');
  console.log('To:', to);
  console.log('Client Name:', clientName);
  console.log('PDF Path:', pdfPath);
  console.log('Email user:', process.env.EMAIL_USER);

  if (!fs.existsSync(pdfPath)) {
    console.error('PDF file not found:', pdfPath);
    return;
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    debug: true,
  });

  const subject = isPaid
    ? `Payment Confirmation – Invoice #${invoiceId}`
    : `Your Invoice #${invoiceId}`;

  const message = isPaid
    ? `Dear ${clientName},\n\nWe’ve received your payment. Your updated invoice is attached.\n\nThank you for your business!`
    : `Dear ${clientName},\n\nPlease find your invoice attached.\n\nLet us know if you have any questions.`;

  const mailOptions = {
    from: `"Service Team" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    text: message,
    attachments: [
      {
        filename: path.basename(pdfPath),
        path: pdfPath,
      },
    ],
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('📧 Invoice email sent to:', to);
    console.log('Nodemailer response:', info.response);
  } catch (error) {
    console.error('❌ Failed to send invoice email:', error);
  }
};

module.exports = sendInvoiceEmail;
