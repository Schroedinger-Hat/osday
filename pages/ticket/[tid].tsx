import { useState } from 'react';
import Hero from '../../components/Hero';
import TicketImage from '../../components/TicketImage';
import { useTranslations } from 'next-intl';
import { NextRouter, useRouter } from 'next/router';
import Image from 'next/image';

export async function getServerSideProps({ params, locale }: { params: any, locale: any }) {
  const { tid } = params;
  const messages = await (await fetch(`https://osday.dev/locales/${locale}.json`)).json();

  return {
    props: {
      metas: {
        title: 'Get the ticket - OSDay2024',
        description:
          '07-08 March 2024 Florence',
        image: `https://2024.osday.dev/api/ticket?tid=${tid}`,
      },
      messages: messages,
    }
  };
}

export default function Ticket() {
  const t = useTranslations('Ticket');
  const router = useRouter() as NextRouter & { query: { tid: string } };;
  const [shared, setShared] = useState(false);

  const { tid } = router.query;
  const osdayURL = 'https://2024.osday.dev';
  const imageURL = `https://2024.osday.dev/api/ticket?tid=${tid}`;
  const sharerURL = `${osdayURL}/ticket/${tid}`;

  const shareData = {
    title: "Open Source Day 2024",
    text: "Join me in the the open source conference made by the open source",
    url: osdayURL,
  };

  const canShare = typeof (navigator) !== 'undefined' && 'share' in navigator;
  
  const shareHandle = async () => {
    try {
      await navigator.share(shareData);
    } catch (err) {
      navigator.clipboard.writeText(sharerURL);
      setShared(true);
      setTimeout(() => setShared(false), 2500);
    }
  }


  const { name: attendeeName } = tid ? JSON.parse(
    decodeURIComponent(
      tid.replace(/\s+/g, '')
      .replace(/[0-9a-f]{2}/g, '%$&')
    )
  ) : '';

  return (
    <>
      <div className="container ticket-container">
      <div className='auto-grid'>
          <div>
            <Hero
              title={t('title')}
              subtitle={t('subtitle')}
              description={t('description')}
              originals={false}
            />
            <div className='title-box'>
              <div className='clearfix mb-2' />

              <p>{shared ? t('copied') : t('copy')}</p>
              <a
                type='button'
                onClick={() => shareHandle()}
                className='ticket-share button button-lg'
              >
                {canShare ? t('share_now') : t('copy_share')}
              </a>
              <a
                type='button'
                target='_blank'
                rel='noreferrer'
                href={'https://twitter.com/intent/tweet?text=' + encodeURIComponent('Just got my free ticket for @schrodinger_hat #OSDay24 Conf — claim yours!\n\n' + sharerURL)}
                className='ticket-share social-button'
              >
                <Image width={30} height={30} src="/icons/twitter.svg" alt="Twitter" />
              </a>
              <a
                type='button'
                target='_blank'
                rel='noreferrer'
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${sharerURL}?utm_source=linkedin&utm_medium=sharer&utm_campaign=osday24_ticket`}
                className='ticket-share social-button'
              >
                <Image width={28} height={28} src="/icons/linkedin.svg" alt="Linkedin" />
              </a>
            </div>
          </div>
              <a
                type='button'
                target='_blank'
                rel='noreferrer'
                className='ticket-image button button-lg'
                href={imageURL}
              >
                <TicketImage name={attendeeName} year='2024' dates='07 - 08 March 2024' />
              </a>
        </div>
      </div>
    </>
  );
}
