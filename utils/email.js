const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: process.env.HOST,
    port: process.env.EPORT,
    auth: {
      user: process.env.USERNAME,
      pass: process.env.PASSWORD,
    },
  });

  const mailOptions = {
    from: 'Ashaka <hello@ashaka.io>',
    to: options.email,
    subject: options.subject,
    text: options.message,
    // text: options.message,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
