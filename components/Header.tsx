import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { slide as Menu } from 'react-burger-menu';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';
import { setCookie, getCookie } from '../utils';

export default function Header() {
  const t = useTranslations('Header');
  const router = useRouter();
  const { pathname } = router;
  const [isOpen, setOpen] = useState(false);
  const [isSticky, setSticky] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);

  const [languageSwitcherOpen, setLanguageSwitcherOpen] = useState(false);
  const [languageCode, setLanguageCode] = useState('en');
  const availableLocales: any = {
    'it': '🇮🇹',
    'en': '🇬🇧',
    'fr': '🇫🇷',
    'es': '🇪🇸'
  };

  useEffect(() => {
    setLanguageCode(document.documentElement.lang);

    const handleScroll = () => setSticky(window.scrollY > 60 || isSticky && window.scrollY > 0);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isSticky]);

  const handleIsOpen = () => {
    setOpen(!isOpen);
  };

  const closeSideBar = () => {
    setOpen(false);
  };

  const handleNotification = () => {
    setNotificationOpen(!notificationOpen);
  };

  useEffect(() => {
    !getCookie('sh_notification')
      ? setTimeout(() => {
          !notificationOpen ? handleNotification() : null;

          setCookie('sh_notification', 'true', 30);
        }, 5000)
      : null;
  }, []);

  const setLanguage = (e: any, lang: string = '') => {
    lang ? null : e.preventDefault();
    setLanguageSwitcherOpen(!languageSwitcherOpen);
    if (lang) {
      setLanguageCode(lang);
    }
  }

  return (
    <header className={`nav${isSticky ? ' sticky' : ''}`}>
      <div className="mobile-menu">
        <Menu
          pageWrapId={'page-wrap'}
          isOpen={isOpen}
          onOpen={handleIsOpen}
          onClose={handleIsOpen}
          aria-label={t('menu_label')}
        >
          <Link href={'/'}>
            <Image
              width={50}
              height={50}
              alt={t('sh_alt')}
              src="/sh.png"
              onClick={closeSideBar}
            />
          </Link>
          {/*<Link onClick={closeSideBar} href={'/'}>
            {t('home_link')}
          </Link>
          <Link onClick={closeSideBar} href={'/agenda'}>
            {t('agenda_link')}
          </Link>
          <Link onClick={closeSideBar} href={'/venue'}>
            {t('venue_link')}
          </Link>
          <Link onClick={closeSideBar} href={'/about'}>
            {t('about_link')}
          </Link>
          <Link onClick={closeSideBar} href={'/speakers'}>
            {t('speakers_Link')}
          </Link>*/}
{/*           <Link onClick={closeSideBar} href={'/cfp'}>
            {t('cfp_link')}
          </Link>
          <Link onClick={closeSideBar} href={'/cfv'}>
            {t('cfv_link')}
          </Link> */}
          <Link onClick={closeSideBar} href={'/sponsor'}>
            {t('sponsor_link')}
          </Link>
          <Link onClick={closeSideBar} target='_blank' href={'https://2023.osday.dev'}>
            {t('edition')}
          </Link>
          <Link onClick={closeSideBar} href={'/edition2021'}>
            {t('edition')}
          </Link>
          <a className='button' target='_blank' href={'https://www.flickr.com/photos/197981994@N04/albums/72177720307039165'} rel="noreferrer">{t('photo_link')}</a>
{/*           <a className='button' target='_blank' href={'https://www.eventbrite.it/e/open-source-day-2023-tickets-441134303577'} rel="noreferrer">Free Tickets</a> */}
          <div className="language-switcher">
            <a onClick={(e) => setLanguage(e)} href="#">{availableLocales[languageCode]}</a>
            {languageSwitcherOpen === true ? (
              <div className="language-switcher-menu">
                <ul>
                  <li><Link onClick={(e) => setLanguage(e, 'it')} href={pathname} locale="it">
                    🇮🇹
                  </Link></li>
                  <li><Link onClick={(e) => setLanguage(e, 'en')} href={pathname} locale="en">
                    🇬🇧
                  </Link></li>
                 <li><Link onClick={(e) => setLanguage(e, 'fr')} href={pathname} locale="fr">
                    🇫🇷
                  </Link></li>
                  <li><Link onClick={(e) => setLanguage(e, 'es')} href={pathname} locale="es">
                    🇪🇸
                  </Link></li>
                </ul>
              </div>
            ) : null}
          </div>
        </Menu>
        <Image
          width={50}
          height={50}
          alt={t('sh_alt')}
          src="/sh.png"
          className="mobile-logo"
        />
      </div>
      <ul className="menu">
        <li>
          <Link href={'/'}>
            <Image width={50} height={50} alt={t('sh_alt')} src="/sh.png" />
          </Link>
        </li>
        {/*<li>
          <Link href={'/'}>{t('home_link')}</Link>
        </li>
        <li>
          <Link href={'/agenda'}>{t('agenda_link')}</Link>
        </li>
        <li>
          <Link href={'/venue'}>{t('venue_link')}</Link>
        </li>
        <li>
          <Link href={'/about'}>{t('about_link')}</Link>
        </li>
        <li>
          <Link href={'/speakers'}>{t('speakers_Link')}</Link>
        </li>
        <a
            className='button'
            target='_blank'
            href={'https://www.flickr.com/photos/197981994@N04/albums/72177720307039165'}
            rel="noreferrer"
        >
          {t('photo_link')}
            </a>*/}
{/*         <li>
          <Link href={'/cfp'}>{t('cfp_link')}</Link>
        </li>
        <li>
          <Link href={'/cfv'}>{t('cfv_link')}</Link>
        </li> */}
{/*         <li>
          <a
            className='button'
            target='_blank'
            href={'https://www.eventbrite.it/e/open-source-day-2023-tickets-441134303577'}
            rel="noreferrer"
          >
            Free Tickets
          </a>
        </li> */}
      </ul>
      <ul>
        <li>
          <Link href={'/sponsor'}>{t('sponsor_link')}</Link>
        </li>
        <li>
          <Link className='button' target='_blank' href={'https://2023.osday.dev'}>{t('edition')}</Link>
        </li>
        {/*<li>
          <Image width={50} height={50} src="/erwin.png" alt={t('erwin_alt')} />
        </li>
        <li className="second-menu">
          <button
            className="notifications-menu"
            aria-haspopup="true"
            aria-expanded="false"
            aria-label={t('updates')}
            onClick={handleNotification}
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
            <span className="notification-dot"></span>
          </button>
          {notificationOpen === true ? (
            <div className="notification-menu">
              <ul>
                <Link href="https://www.schrodinger-hat.it/">
                  <li>
                    <Image src="/sh.png" alt="" width="20" height="20" /> {substringNotification(t('notification.n1'))}
                  </li>
                </Link>
              </ul>
            </div>
          ) : null}
        </li>
      */}
        <li className="language-switcher">
          <a onClick={(e) => setLanguage(e)} href="#">{availableLocales[languageCode]}</a>
          {languageSwitcherOpen === true ? (
            <div className="language-switcher-menu">
              <ul>
                <Link onClick={(e) => setLanguage(e, 'it')} href={pathname} locale="it">
                  🇮🇹
                </Link>
                <Link onClick={(e) => setLanguage(e, 'en')} href={pathname} locale="en">
                  🇬🇧
                </Link>
                <Link onClick={(e) => setLanguage(e, 'fr')} href={pathname} locale="fr">
                  🇫🇷
                </Link>
                <Link onClick={(e) => setLanguage(e, 'es')} href={pathname} locale="es">
                  🇪🇸
                </Link>
              </ul>
            </div>
          ) : null}
        </li>
      </ul>
    </header>
  );
}


function substringNotification(notification: string): string {
  if (notification.length > 35) {
    return notification.substring(0, 35) + '...'
  }
  return notification;
}
