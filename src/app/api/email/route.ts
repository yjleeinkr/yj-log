import { NextResponse } from 'next/server';
import { object, string } from 'yup';
import { sendEmail } from '@/service/email';

const emailSchema = object({
  email: string().email().required(),
  subject: string().required(),
  text: string().required(),
});

export async function POST(request: Request) {
  const reqBody = await request.json();

  if (!emailSchema.isValidSync(reqBody)) {
    return new NextResponse(JSON.stringify({ message: 'invalid format' }), { status: 400 });
  }
  try {
    await sendEmail(reqBody);
    return new NextResponse(JSON.stringify({ message: 'success' }), { status: 200 });
  } catch (err) {
    console.log(err);
    return new NextResponse(JSON.stringify({ message: 'fail' }), { status: 500 });
  }
}
