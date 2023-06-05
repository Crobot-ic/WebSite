import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: process.env.SERVICE_MAIL, 
    auth: { 
        user: process.env.USER_MAIL,
        pass: process.env.PASS_MAIL
    }, 
    tls: {
        rejectUnauthorized: false
    }
});

export default transporter;