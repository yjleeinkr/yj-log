import Link from 'next/link';

export default function ContactButton() {
  return (
    <Link href="/contact" className="text-xs bg-highlight rounded-lg py-1 px-3 hover:shadow-highlight transition-all">
      Contact Me
    </Link>
  );
}
