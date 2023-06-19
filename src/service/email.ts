import axios from 'axios';

type FormType = {
  email: string;
  subject: string;
  text: string;
};

export async function sendEmail(emailForm: FormType) {
  const res = await axios.post('/api/email', emailForm);
  return res;
}
