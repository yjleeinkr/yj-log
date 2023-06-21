import nodemailer from 'nodemailer';
import { FormType } from './contact';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_ID,
    pass: process.env.EMAIL_PW,
  },
});

export function sendEmail({ email, subject, text }: FormType) {
  const mailData = {
    to: process.env.EMAIL_ID,
    from: email,
    subject: `[YJ_LOG] ${subject}`,
    html: `
      <h1>${subject}</h1>
      <p>sender: ${email}</p>
      <div>${text}</div>
    `,
  };

  return transporter.sendMail(mailData);
}
