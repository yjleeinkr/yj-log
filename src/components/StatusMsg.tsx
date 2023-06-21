export type EmailStatus = {
  state: 'success' | 'error';
  message: string;
};

export default function StatusMsg({ emailStatus: { state, message } }: { emailStatus: EmailStatus }) {
  const isSuccess = state === 'success';
  const icon = isSuccess ? '✅' : '🔥';
  return <p className={`py-2 px-3 text-xs ${isSuccess ? 'bg-[#c5f7d8]' : 'bg-[#fbb0b0]'}`}>{`${icon} ${message}`}</p>;
}
