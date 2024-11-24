import nodemailer from 'nodemailer';
import 'dotenv/config'

const EMAIL_USER = process.env['EMAIL_SERVER'] || ''; 
const EMAIL_PASS = process.env['EMAIL_PASS'] || '';


// Configuración del correo
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
});

export const sendEmail = async (alerts: string[]) => {
    const mailOptions = {
        from: 'EMAIL_USER',
        to: '231199@ids.upchiapas.edu.mx',
        subject: 'Alerta de condiciones anómalas en el área',
        text: `Se detectaron las siguientes anomalías:\n\n${alerts.join('\n')}`,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Correo enviado con éxito');
    } catch (error) {
        console.error('Error al enviar el correo:', error);
    }
};

