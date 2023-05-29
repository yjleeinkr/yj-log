import { NextResponse } from 'next/server';
import { sendEmail } from '@/service/email';

export async function POST(request: Request) {
  const emailContent = await request.json();
  const res = await sendEmail(emailContent);
  return NextResponse.json(res);
}
