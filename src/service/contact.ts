export type FormType = {
  email: string;
  subject: string;
  text: string;
};

export async function contactViaEmail(emailForm: FormType) {
  const res = await fetch('/api/email', {
    method: 'POST',
    body: JSON.stringify(emailForm),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'request fail');
  }
  return data;
}
