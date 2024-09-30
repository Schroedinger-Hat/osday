import Hero from '../components/Hero';
import { useTranslations } from 'next-intl';
import Image from "next/image";
import Link from 'next/link';
import React, { ReactNode } from 'react';

export async function getStaticProps({ locale }: { locale: any }) {
  return {
    props: {
      metas: {
        title: 'Faq, Open Source Day 2025 - Florence',
      },
      messages: (await import(`../public/locales/${locale}.json`)).default
    }
  };
}

export default function Faq() {
  const t = useTranslations('Faq');

  return (
    <>
      <div className="container">
        <Hero
          title={t('title')}
          subtitle={t('subtitle')}
          description={t('description')}
          originals={false}
        />
        <section className="after_main">
          <h2>{t('heading')}</h2>
          <div className='arrival'>
            <div className='infos'>
              <h3>{t('faq_question_0')}</h3>
              <p>{t('faq_answer_0')}</p>

              <h3>{t('faq_question_1')}</h3>
              <p>{t('faq_answer_1')}</p>

              <h3>{t('faq_question_2')}</h3>
              <p>{t.rich('faq_answer_2', {
                    link_stellar: (children: ReactNode) => (
                      <a target="_blank" rel="noreferrer" href="https://eventi.thestellaritaly.it/events/">{children}</a>
                    )
              })}</p>

              <h3>{t('faq_question_3')}</h3>
              <p>{t('faq_answer_3')}</p>

              <h3>{t('faq_question_4')}</h3>
              <p>{t('faq_answer_4')}</p>

              <h3>{t('faq_question_5')}</h3>
              <p>{t.rich('faq_answer_5', {
                link_agenda: (children: ReactNode) => (
                  <Link href="/agenda-compact">{children}</Link>
                )
              })}</p>
            </div>
          </div>
          <div className='information'>
            <p>{t.rich('information', {
                    space: () => (
                      <br />
                    ),
                    u: (children: ReactNode) => (<u>{children}</u>),
                    link_venue: (children: ReactNode) => (
                      <Link href="/venue">{children}</Link>
                    ),
                    link_linkedin: (children: ReactNode) => (
                      <a target="_blank" rel="noreferrer" href="https://www.linkedin.com/company/schrodinger-hat/">{children}</a>
                    ),
                })}
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
