'use client';

import { useState } from 'react';
import { object, string } from 'yup';
import axios from 'axios';

let emailSchema = object({
  email: string().email().required(),
  subject: string().required(),
  text: string(),
});

export default function EmailForm() {
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [text, setText] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [doubleClickFlag, setDoubleClickFlag] = useState(false);

  const handleValue = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {
      currentTarget: { name, value },
    } = event;
    switch (name) {
      case 'email':
        setEmail(value);
        break;
      case 'subject':
        setSubject(value);
        break;
      case 'text':
        setText(value);
    }
  };

  const checkDoubleClick = () => {
    if (doubleClickFlag) {
      return doubleClickFlag;
    } else {
      setDoubleClickFlag(true);
      return false;
    }
  };

  const submitEmail = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (checkDoubleClick()) return;
    const emailContents = { email, subject, text };
    try {
      await emailSchema.validate(emailContents);
      const res = await axios.post('/api/email', emailContents);
      if (res.data) {
        setIsSuccess(true);
        setStatusMessage('✅ 메일을 성공적으로 보냈습니다');
      } else {
        setIsSuccess(false);
        setStatusMessage('🔥 메일 전송에 실패했습니다. 다시 시도해주세요!');
      }
    } catch (err) {
      setIsSuccess(false);
      setStatusMessage('❌ 메일 양식을 다시 확인해주세요!');
    } finally {
      setTimeout(() => {
        setStatusMessage('');
        setIsSuccess(false);
        setDoubleClickFlag(false);
      }, 2000);
    }
  };

  return (
    <>
      <div className="w-fit m-zero-auto my-5">
        {isSuccess ? (
          <p className={`bg-[#c5f7d8] py-2 px-3 text-xs ${statusMessage ? 'inline-block' : 'hidden'}`}>
            {statusMessage}
          </p>
        ) : (
          <p className={`bg-[#fbb0b0] py-2 px-3 text-xs ${statusMessage ? 'inline-block' : 'hidden'}`}>
            {statusMessage}
          </p>
        )}
      </div>
      <form className="bg-lightgrey w-full sm:w-[90%] md:w-[70%] m-zero-auto p-3 rounded-lg" onSubmit={submitEmail}>
        <h3 className="text-primary text-start py-2 text-sm">Your email address</h3>
        <input
          type="text"
          className="w-full focus:outline-none focus:border-secondary focus:shadow-input py-1 px-2 text-sm"
          name="email"
          value={email}
          onChange={handleValue}
        />
        <h3 className="text-primary text-start py-2 text-sm">Subject</h3>
        <input
          type="text"
          className="w-full focus:outline-none focus:border-secondary focus:shadow-input py-1 px-2 text-sm"
          name="subject"
          value={subject}
          onChange={handleValue}
        />
        <h3 className="text-primary text-start py-2 text-sm">Message</h3>
        <textarea
          className="w-full resize-none h-44 focus:outline-none focus:border-secondary focus:shadow-input py-1 px-2 text-sm"
          name="text"
          value={text}
          onChange={handleValue}
        />
        <button className="bg-[#e0e0e0] w-full mt-2 py-2 font-bold hover:bg-point transition-all duration-300">
          Submit
        </button>
      </form>
    </>
  );
}
