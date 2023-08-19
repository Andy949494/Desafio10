import nodemailer from 'nodemailer';
import config from './config.js';

var transporter = nodemailer.createTransport({
  service: 'gmail',
    auth: {
      user: config.mailUser,
      pass: config.mailPass

    }
  });
  
export default transporter;