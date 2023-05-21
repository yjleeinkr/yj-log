import Image from 'next/image';
import avatarImg from 'public/img/avatar.png';
import ContactButton from './ContactButton';

export default function Profile() {
  return (
    <div className="flex flex-col items-center w-fit m-zero-auto p-4 box-border">
      <figure className="rounded-full overflow-hidden w-32">
        <Image src={avatarImg} alt="avatar" priority />
      </figure>
      <h1 className="text-xl font-bold">Welcome, I'm yj!</h1>
      <p>Frontend engineer</p>
      <p className="text-sm font-light pb-2">Better than yesterday</p>
      <ContactButton />
    </div>
  );
}
