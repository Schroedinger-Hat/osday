import Image from 'next/image';
import Link from 'next/link';
import useScrollDirection from '../hooks/onScrollDirection';

export default function Header() {
  const scrollDirection = useScrollDirection();

  return (
    <header className={`nav ${scrollDirection === 'down' ? 'hide' : 'show'}`}>
      <ul>
        <li>
          <Image
            width={50}
            height={50}
            alt="Schrodingers Hat Community Logo - Join the open source community"
            src="/sh.png"
          />
        </li>
        <li>
          <Link href={'/Agenda'}>Agenda</Link>
        </li>
        <li>
          <Link href={'/Venue'}>Venue</Link>
        </li>
        <li>
          <Link href={'/About'}>About</Link>
        </li>
        <li>
          <Link href={'/Sponsor'}>Sponsor</Link>
        </li>
        <li>
          <Link href={'/Speakers'}>Speakers</Link>
        </li>
        <li>
          <Link href={'/CFP'}>CFP</Link>
        </li>
      </ul>
      <ul>
        <li>
          <button
            className="notifications-menu"
            aria-haspopup="true"
            aria-expanded="false"
            aria-label="Notifiche"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="Hawkins-Icon Hawkins-Icon-Standard"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M13 4.57092C16.3922 5.05624 18.9998 7.9736 18.9998 11.5V15.2538C20.0486 15.3307 21.0848 15.4245 22.107 15.5347L21.8926 17.5232C18.7219 17.1813 15.409 17 11.9998 17C8.59056 17 5.27764 17.1813 2.10699 17.5232L1.89258 15.5347C2.91473 15.4245 3.95095 15.3307 4.99978 15.2538V11.5C4.99978 7.97345 7.6076 5.05599 11 4.57086V2H13V4.57092ZM8.62568 19.3712C8.6621 20.5173 10.1509 22 11.9993 22C13.8477 22 15.3365 20.5173 15.373 19.3712C15.38 19.1489 15.1756 19 14.9531 19H9.04555C8.82308 19 8.61862 19.1489 8.62568 19.3712Z"
                fill="currentColor"
              ></path>
            </svg>
          </button>
        </li>
        <li>
          <a
            href="https://www.youtube.com/watch?v=8z6CRK61JLA&t=1s"
            target="_blank"
            rel="noreferrer"
          >
            Edizione 2021
          </a>
        </li>
        <li>
          <Image
            width={50}
            height={50}
            src="/erwin.png"
            alt="Picture of Erwin Schrodinger"
          />
        </li>
      </ul>
    </header>
  );
}
