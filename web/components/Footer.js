import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="flex items-center justify-between pb-10">
      <Link href="/" className="flex gap-4 items-center">
        <Image
          width={36}
          height={36}
          src="/favicon.ico"
          className="w-8 md:w-9"
          alt="logo"
        />{' '}
        <span>Home</span>
      </Link>

      <div>
        <p>&copy; {new Date().getFullYear().toString()} by NafizPervez</p>
      </div>
    </footer>
  );
};

export default Footer;
