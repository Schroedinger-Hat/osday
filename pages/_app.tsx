import React from 'react';
import '../styles/global.css';
import Head from 'next/head';

const App = ({ Component, pageProps }) => {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const onClickAnywhere = () => {
    inputRef.current.focus();
  };

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="initial-scale=1.0, width=device-width"
          key="viewport"
          maximum-scale="1"
        />
        <link rel="icon" type="image/png" href="/favicon-32x32.png" />
        <title>Open Source Day 2024</title>

        <meta name="description" content='The open source conference made by the open source for the open source' />

        <meta property="og:title" content="Open Source Day 2024" />
        <meta property="og:type" content="article" />
        <meta property="og:image" content='https://2024.osday.dev/intro24.png' />
        <meta property="og:url" content='https://terminal.osday.dev' />
        <meta property="og:description" content="Open Source Day 2024 coming soon on the 07-08 March 2024. Stay tuned on our socials" />
        <meta property="og:site_name" content="Open Source Day 2024" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content='https://2024.osday.dev/intro24.png' />
        <meta name="twitter:image:alt" content="Open Source Day 2024" />
        <meta name="twitter:site" content="@schrodinger_hat" />
      </Head>

      <div
        className="text-light-foreground dark:text-dark-foreground min-w-max text-xs md:min-w-full md:text-base"
        onClick={onClickAnywhere}
      >
        <main className="bg-light-background dark:bg-dark-background w-full h-full p-2">
          <Component {...pageProps} inputRef={inputRef} />
        </main>
      </div>
    </>
  );
};

export default App;
