import * as nodemailer from 'nodemailer';

type FormType = {
  email: string;
  subject: string;
  text: string;
};

export async function sendEmail({ email, subject, text }: FormType) {
  let transporter = nodemailer.createTransport({
    host: 'smtp.naver.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_ID,
      pass: process.env.EMAIL_PW,
    },
  });

  let emailForm = {
    from: email,
    to: process.env.EMAIL_ID,
    subject,
    text,
  };

  try {
    const response = await transporter.sendMail(emailForm);
    if (response.accepted[0] === email) return true;
    else throw new Error('dispatch email error');
  } catch (err) {
    console.log(err);
    return false;
  }
}
