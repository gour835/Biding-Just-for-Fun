import nodemailer from 'nodemailer';

const Transport = nodemailer.createTransport({
    host: 'smtp-relay.brevo.com',
    port: 587,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_KEY
    }
});
export default Transport;