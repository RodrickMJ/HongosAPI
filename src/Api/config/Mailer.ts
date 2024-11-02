import nodemailer from "nodemailer";
import 'dotenv/config'

const userGmail = process.env['EMAIL_USER'] || ''; 
const passGmail =  process.env['EMAIL_PASS'] || '';
const hostGmail = process.env['HOST_EMAIL'] || '';

const Mailertransporter = nodemailer.createTransport({
    host: hostGmail,
    port: 465,
    secure: true, 
    auth: {
      user: userGmail,
      pass: passGmail,
    },
  });

export default Mailertransporter;