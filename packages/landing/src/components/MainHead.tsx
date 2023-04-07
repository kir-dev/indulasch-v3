import Head from 'next/head';

const title = '🚌 | InduláSch';
const description = 'Mobil alkalmazás mindennapi utazáshoz & távolról konfigurálható információs kijelző';

export function MainHead() {
  return (
    <Head>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta property='og:title' content={title} />
      <meta property='og:description' content={description} />
    </Head>
  );
}
