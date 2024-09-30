import { useTranslations } from 'next-intl';
import React, { ReactNode } from 'react';
import SponsorshipTier from './SponsorshipTier';

type TPremiums = {
  type: string;
  text: string;
  has: {
    community: boolean;
    silver: boolean;
    gold: boolean;
    platinum: boolean;
    diamond: boolean;
  };
  image?: string;
  url?: string;
};

/*
 * Logo on streaming video
 * Stand in expo area
 * Tech talk */

const premiums: TPremiums[] = [
  {
    type: 'thanksYou',
    text: 'Thank you',
    has: {
      community: true,
      silver: true,
      gold: true,
      platinum: true,
      diamond: true,
    }
  },
  {
    type: 'socialPost',
    text: 'Social post with logo',
    has: {
      community: true,
      silver: true,
      gold: true,
      platinum: true,
      diamond: true,
    }
  },
  {
    type: 'websiteLogo',
    text: 'Logo on website',
    has: {
      community: true,
      silver: true,
      gold: true,
      platinum: true,
      diamond: true,
    }
  },
  {
    type: 'socialAwareness',
    text: 'Social Awareness',
    has: {
      community: true,
      silver: true,
      gold: true,
      platinum: true,
      diamond: true,
    }
  },
  {
    type: 'badge',
    text: 'Conference Badge',
    has: {
      community: false,
      silver: false,
      gold: true,
      platinum: true,
      diamond: true,
    }
  },
  {
    type: 'posterLogo',
    text: 'Logo on poster',
    has: {
      community: false,
      silver: true,
      gold: true,
      platinum: true,
      diamond: true,
    }
  },
  {
    type: 'rollUp',
    text: 'Rollup Logo Print',
    has: {
      community: false,
      silver: true,
      gold: true,
      platinum: true,
      diamond: true,
    }
  },
  {
    type: 'streamingVideo',
    text: 'Logo in streaming',
    has: {
      community: false,
      silver: true,
      gold: true,
      platinum: true,
      diamond: true,
    }
  },
  {
    type: 'jobOffer',
    text: 'Job Offer',
    has: {
      community: false,
      silver: false,
      gold: true,
      platinum: true,
      diamond: true,
    }
  },
  {
    type: 'jobInNewsletter',
    text: 'Job Offer in Newsletter',
    has: {
      community: false,
      silver: false,
      gold: false,
      platinum: false,
      diamond: true,
    }
  },
  {
    type: 'jobInDiscord',
    text: 'Job Offer pinned Discord',
    has: {
      community: false,
      silver: false,
      gold: false,
      platinum: false,
      diamond: true,
    }
  },
  {
    type: 'attendees',
    text: "Attendee's list",
    has: {
      community: false,
      silver: false,
      gold: false,
      platinum: true,
      diamond: true,
    }
  },
  {
    type: 'unattendedBooth',
    text: 'Unattended Booth',
    has: {
      community: false,
      silver: false,
      gold: true,
      platinum: false,
      diamond: false,
    }
  },
  {
    type: 'standExpoArea',
    text: 'Stand in Conference Hall',
    has: {
      community: false,
      silver: false,
      gold: false,
      platinum: true,
      diamond: true,
    }
  },
];

export default function SponsorshipTable() {
  const t = useTranslations('Sponsor');

  return (
    <>
      <div className="sponsortable">
        <div className="sponsortable_tiers_mobile">
          <div className="sponsortable_tiers_card">
            <span className="">
              Silver <br />
              &euro; 1000{' '}
            </span>
          </div>
          <div className="sponsortable_tiers_card">
            <span className="">
              Gold <br />
              &euro; 2000{' '}
            </span>
          </div>
          <div className="sponsortable_tiers_card">
            <span className="">
              Platinum <br />
              &euro; 3000{' '}
            </span>
          </div>
          <div className="sponsortable_tiers_card">
          <span className="">
              Diamond <br />
              &euro; 4000{' '}
            </span>
          </div>
        </div>
        <table>
          <thead className="sponsortable_tiers">
            <tr>
              <th></th>
              <th className="sponsortable_tiers_card">
                <span className="">community</span>
              </th>
              <th className="sponsortable_tiers_card">
                <span className="">silver</span>
              </th>
              <th className="sponsortable_tiers_card">
                <span className="">gold</span>
              </th>
              <th className="sponsortable_tiers_card">
                <span className="">platinum</span>
              </th>
              <th className="sponsortable_tiers_card">
                <span className="">diamond</span>
              </th>
            </tr>
          </thead>
          <tbody className="sponsortable_rows">
            {premiums.map((premium) => {
              return (
                <tr key={premium.type}>
                  <td>{premium.text}</td>
                  <td className="sponsortable_onlyDesktop">
                    {premium.has.community ? (
                      <span className="confirmed_tier">&#10004;</span>
                    ) : (
                      <span>&#10007;</span>
                    )}
                  </td>
                  <td>
                    {premium.has.silver ? (
                      <span className="confirmed_tier">&#10004;</span>
                    ) : (
                      <span>&#10007;</span>
                    )}
                  </td>
                  <td>
                    {premium.has.gold ? (
                      <span className="confirmed_tier">&#10004;</span>
                    ) : (
                      <span>&#10007;</span>
                    )}
                  </td>
                  <td>
                    {premium.has.platinum ? (
                      <span className="confirmed_tier">&#10004;</span>
                    ) : (
                      <span>&#10007;</span>
                    )}
                  </td>
                  <td>
                    {premium.has.diamond ? (
                      <span className="confirmed_tier">&#10004;</span>
                    ) : (
                      <span>&#10007;</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr className="sponsortable_footer">
              <td></td>
              <td>
                <i>
                  {t.rich('send_email_sm', {
                    email: (children: ReactNode) => (
                      <a href="mailto:events@schroedinger-hat.org?subject=OSDay 2025, Community Partner">
                        <u>{children}</u>
                      </a>
                    )
                  })}
                </i>
              </td>
              <td>
                &euro; 1000 <br />
                {t.rich('send_email_sm', {
                  email: (children: ReactNode) => (
                    <a href="mailto:events@schroedinger-hat.org?subject=OSDay 2025, Silver Partner">
                      <u>{children}</u>
                    </a>
                  )
                })}
              </td>
              <td>
                &euro; 2000 <br />
                {t.rich('send_email_sm', {
                  email: (children: ReactNode) => (
                    <a href="mailto:events@schroedinger-hat.org?subject=OSDay 2025, Gold Partner">
                      <u>{children}</u>
                    </a>
                  )
                })}
              </td>
              <td>
                &euro; 3000 <br />
                {t.rich('send_email_sm', {
                  email: (children: ReactNode) => (
                    <a href="mailto:events@schroedinger-hat.org?subject=OSDay 2025, Platinum Partner">
                      <u>{children}</u>
                    </a>
                  )
                })}
              </td>
              <td>
                &euro; 4000 <br />
                {t.rich('send_email_sm', {
                  email: (children: ReactNode) => (
                    <a href="mailto:events@schroedinger-hat.org?subject=OSDay 2025, Diamond Partner">
                      <u>{children}</u>
                    </a>
                  )
                })}
              </td>
            </tr>
          </tfoot>
        </table>

        <section className="sponsors_2022">
          <SponsorshipTier
            title={t('community')}
            card_color="community"
            offer={t('community_offer')}
            emailLink={t.rich('send_email', {
              email: (children: ReactNode) => (
                <a href="mailto:events@schroedinger-hat.org?subject=OSDay 2025, Community Partner">
                  <u>{children}</u>
                </a>
              )
            })}
          />
          <SponsorshipTier
            title={t('media')}
            card_color="media"
            offer={t('media_offer')}
            emailLink={t.rich('send_email', {
              email: (children: ReactNode) => (
                <a href="mailto:events@schroedinger-hat.org?subject=OSDay 2025, Media Partner">
                  <u>{children}</u>
                </a>
              )
            })}
          />
        </section>

        <h4 className="sponsor_heading">{t('sponsor_deadline')}</h4>
      </div>
    </>
  );
}
