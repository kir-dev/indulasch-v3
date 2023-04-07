import Head from 'next/head';

const title = 'Megjelenés | InduláSch';
const description = 'Turbózd fel az eseményeid PR-ját egy megjelenéssel a földszinti TV-n!';

export function AdvertisementHead() {
  return (
    <Head>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta property='og:title' content={title} />
      <meta property='og:description' content={description} />
    </Head>
  );
}
