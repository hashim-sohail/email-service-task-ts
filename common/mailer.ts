import nodemailer from 'nodemailer';

const mailer = nodemailer.createTransport({
  host: process.env.HOST,
  port: parseInt(process.env.PORT || '587'),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.USER || 'admin', // auth username
    pass: process.env.PASS || 'pass', // auth password
  },
});

export default mailer;