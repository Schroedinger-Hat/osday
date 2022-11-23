import React from 'react';

type TPremiums = {
  type: string;
  text: string;
  has: {
    silver: boolean;
    gold: boolean;
    diamond: boolean;
    platinum: boolean;
  };
  image?: string;
  url?: string;
};
const premiums: TPremiums[] = [
  {
    type: 'thanksYou',
    text: 'Thank you',
    has: {
      silver: false,
      gold: true,
      diamond: true,
      platinum: false
    }
  },
  {
    type: 'socialPost',
    text: 'Social post with logo',
    has: {
      silver: true,
      gold: true,
      diamond: false,
      platinum: true
    }
  },
  {
    type: 'rollupLogo',
    text: 'Logo on Rollup',
    has: {
      silver: false,
      gold: true,
      diamond: true,
      platinum: true
    }
  },
  {
    type: 'websiteLogo',
    text: 'Logo on website',
    has: {
      silver: false,
      gold: false,
      diamond: true,
      platinum: true
    }
  },
  {
    type: 'posterLogo',
    text: 'Logo on poster',
    has: {
      silver: true,
      gold: false,
      diamond: false,
      platinum: true
    }
  }
];

export default function SponsorshipTable() {
  return (
    <>
      <div className="sponsortable">
        <table>
          <thead className="sponsortable_tiers">
            <tr>
              <th></th>
              <th className="sponsortable_tiers_card">
                <span className="">silver</span>
              </th>
              <th className="sponsortable_tiers_card">
                <span className="">gold</span>
              </th>
              <th className="sponsortable_tiers_card">
                <span className="">diamond</span>
              </th>
              <th className="sponsortable_tiers_card">
                <span className="">platinum</span>
              </th>
            </tr>
          </thead>
          <tbody className="sponsortable_rows">
            {premiums.map((premium) => {
              return (
                <tr key={premium.type}>
                  <td>{premium.text}</td>
                  <td>{premium.has.silver ? '\u2714' : '\u2717'}</td>
                  <td>{premium.has.gold ? '\u2714' : '\u2717'}</td>
                  <td>{premium.has.diamond ? '\u2714' : '\u2717'}</td>
                  <td>{premium.has.platinum ? '\u2714' : '\u2717'}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
