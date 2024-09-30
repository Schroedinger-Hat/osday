import { useRef, useState } from 'react';
import Image from 'next/image';
import Hero from '../components/Hero';
import { useTranslations } from 'next-intl';

export async function getStaticProps({ locale }: { locale: any }) {
  return {
    props: {
      metas: {
        title: 'Newsletter - Open Source Day 2025 - Florence',
        description:
          'Open Source Day 2025 coming on March 2025. Stay tuned on our social!'
      },
      messages: (await import(`../public/locales/${locale}.json`)).default
    }
  };
}

export default function Newsletter() {
  const t = useTranslations('Newsletter');
  const [newsletterState, setNewsletterState] = useState({
      waiting: false,
      subscribed: false,
      email: '',
      emailError: false,
  });
  const emailInputRef = useRef<HTMLInputElement>(null);

  const newsletterImage = newsletterState.subscribed ?
    '/newsletter/lore.jpg'
    : '/newsletter/gabri-nic.jpg';

  const onClickHandler = async () => {
    if (newsletterState.waiting)
    return;
    
    if(!newsletterState.email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i)) {
      emailInputRef?.current?.focus();
      setNewsletterState(() => {
        return {
          ...newsletterState,
          emailError: true,
        }
      });
      return;
    }

    setNewsletterState((prev) => ({
      ...prev,
      waiting: true,
    }));

    const res = await fetch('/api/email-octupus', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: newsletterState.email })
    });
    if (res.status === 200) {
        const data = await res.json();
        if (data.id) {
          setNewsletterState((prev) => ({
            ...prev,
            subscribed: true,
          }));
        }
        if (data.error?.code) {
          switch (data.error.code) {
            case "MEMBER_EXISTS_WITH_EMAIL_ADDRESS":
              alert('You are already subscribed to our newsletter');
              break;
            default:
              alert('An error occurred, please try again later');
              break;
          }
        }
    }
    setNewsletterState((prev) => ({
      ...prev,
      waiting: false,
    }));
}

  return (
    <>
      <div className="container">
        <div className='auto-grid'>
          <div>
            <Hero
              title={t('title')}
              subtitle={t('subtitle')}
              description={t('description')}
              originals={false}
            />
            <div className='title-box'>
              {!newsletterState.subscribed ? <input
                ref={emailInputRef}
                type='email'
                className='input-newsletter mb-2'
                style={{
                  borderColor: newsletterState.emailError ? 'red' : '#fff',
                }}
                onChange={(e) => setNewsletterState((prev) => {
                  return {
                    ...prev,
                    emailError: false,
                    email: e.target.value,
                  }
                })}
                placeholder='fancy.email@amazing.domain'
              />
              : <h3 className='mb-2'>{t('thanks')}</h3>}
              <div className='clearfix mb-2' />
              {!newsletterState.subscribed ?
              <a
                type='button'
                onClick={onClickHandler}
                className='newsletter-subscribe button button-lg'
              >
                {newsletterState.waiting ? 'subscribing' : `${t('subscribe')} →`}
              </a> : null}
            </div>
          </div>
          <div className="newsletter-image">
            <Image
              style={{
                width: '100%',
                height: 'auto',
                maxHeight: '500px',
                objectFit: 'contain',
              }}
              sizes="100vw"
              width={600}
              height={450}
              alt='Subscribe, we have the candy'
              src={newsletterImage}
            />
          </div>
        </div>
      </div>
    </>
  );
}
