import Image from 'next/image';
import Link from 'next/link';
import avatarImg from 'public/img/avatar.png';

export default function Profile() {
  return (
    <div className="flex flex-col items-center w-fit m-zero-auto p-4 box-border">
      <figure className="rounded-full overflow-hidden w-32">
        <Image src={avatarImg} alt="avatar" priority />
      </figure>
      <h2 className="text-xl font-bold">{"Welcome, I'm yj!"}</h2>
      <h3>Frontend engineer</h3>
      <p className="text-sm font-light pb-2">Better than yesterday</p>
      <Link href="/contact" className="text-xs bg-highlight rounded-lg py-1 px-3 hover:shadow-highlight transition-all">
        Contact Me
      </Link>
    </div>
  );
}
