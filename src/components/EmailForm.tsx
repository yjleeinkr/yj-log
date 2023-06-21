'use client';

import { useState } from 'react';
import StatusMsg, { EmailStatus } from './StatusMsg';
import { contactViaEmail } from '@/service/contact';

type EmailForm = {
  email: string;
  subject: string;
  text: string;
};

const DEFAULT_FORM = {
  email: '',
  subject: '',
  text: '',
};

export default function EmailForm() {
  const [emailForm, setEmailForm] = useState<EmailForm>(DEFAULT_FORM);
  const [doubleClickFlag, setDoubleClickFlag] = useState(false);
  const [emailStatus, setEmailStatus] = useState<EmailStatus | null>(null);

  const handleFormChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {
      currentTarget: { name, value },
    } = event;
    setEmailForm(prev => ({ ...prev, [name]: value }));
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
    try {
      const res = await contactViaEmail(emailForm);
      if (res.message === 'success') {
        setEmailStatus({
          state: 'success',
          message: '메일을 성공적으로 보냈습니다',
        });
        setEmailForm(DEFAULT_FORM);
      }
    } catch (err) {
      setEmailStatus({
        state: 'error',
        message: '메일 전송에 실패했습니다. 다시 시도해주세요!',
      });
    } finally {
      setTimeout(() => {
        setEmailStatus(null);
        setDoubleClickFlag(false);
      }, 2000);
    }
  };

  return (
    <>
      <div className="w-fit m-zero-auto my-5">{emailStatus && <StatusMsg emailStatus={emailStatus} />}</div>
      <form className="bg-lightgrey w-full sm:w-[90%] md:w-[70%] m-zero-auto p-3 rounded-lg" onSubmit={submitEmail}>
        <h3 className="text-primary text-start py-2 text-sm">Your email address</h3>
        <input
          type="text"
          className="w-full focus:outline-none focus:border-secondary focus:shadow-input py-1 px-2 text-sm"
          name="email"
          value={emailForm.email}
          onChange={handleFormChange}
        />
        <h3 className="text-primary text-start py-2 text-sm">Subject</h3>
        <input
          type="text"
          className="w-full focus:outline-none focus:border-secondary focus:shadow-input py-1 px-2 text-sm"
          name="subject"
          value={emailForm.subject}
          onChange={handleFormChange}
        />
        <h3 className="text-primary text-start py-2 text-sm">Message</h3>
        <textarea
          className="w-full resize-none h-44 focus:outline-none focus:border-secondary focus:shadow-input py-1 px-2 text-sm"
          name="text"
          value={emailForm.text}
          onChange={handleFormChange}
        />
        <button className="bg-[#e0e0e0] w-full mt-2 py-2 font-bold hover:bg-point transition-all duration-300">
          Submit
        </button>
      </form>
    </>
  );
}
