import { Head, Html, Main, NextScript } from 'next/document';

import { Footer } from '@/components/Footer';
import { TitleBar } from '@/components/TitleBar';

export default function Document() {
  return (
    <Html lang='hu'>
      <Head>
        <link rel='apple-touch-icon' sizes='180x180' href='/icon/apple-touch-icon.png' />
        <link rel='icon' type='image/png' sizes='32x32' href='/icon/favicon-32x32.png' />
        <link rel='icon' type='image/png' sizes='16x16' href='/icon/favicon-16x16.png' />
        <link rel='manifest' href='/site.webmanifest' />
        <meta name='msapplication-TileColor' content='#97739c' />
        <meta name='theme-color' content='#171923' />
      </Head>
      <body>
        <TitleBar />
        <Main />
        <NextScript />
        <Footer />
      </body>
    </Html>
  );
}
