import { useState } from 'react';
import Hero from '../../components/Hero';
import TicketImage from '../../components/TicketImage';
import { useTranslations } from 'next-intl';
import { NextRouter, useRouter } from 'next/router';

export async function getServerSideProps({ params, locale }: { params: any, locale: any }) {
  const { tid } = params;
  const messages = await (await fetch(`https://osday.dev/locales/${locale}.json`)).json();

  return {
    props: {
      metas: {
        title: 'Ticket, Open Source Day 2023 - Florence',
        description:
          'Open Source Day 2023 coming on the 24th of March 2023. Stay tuned on our social',
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
      navigator.clipboard.writeText(`https://2024.osday.dev/api/ticket?tid=${tid}`);
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
            </div>
          </div>
          <div className="ticket-image">
            <TicketImage name={attendeeName} year='2024' dates='07 - 08 March 2024' />
          </div>
        </div>
      </div>
    </>
  );
}
