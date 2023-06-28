import Head from "next/head";

export const HeadSelector = () => {
  return (
    <Head>
      <title>Routist | kolo</title>
      {/* <link rel="icon" href="/icons/logo-tabory.svg" /> */}
      <meta name="author" content="Pavel Zapletal" />
      <meta
        name="keywords"
        content="routist, cycklistika, kolo, cyklovýlety, cyklovylety, cykloturismus, kolo výlety, kolo výlety, turistika, výlety, výlety po okolí"
      />
      {/* <link
        rel="canonical"
        href={`https://www.primestak-brno.cz${currentRoute}`}
      /> */}
      {/* <meta
        name="google-site-verification"
        content="KV7BmFAqyUFzPz1ft0TFad03jyyUR8o0b-1CvI4FmGs"
      /> */}
      {/* <meta name="description" content={currentRouteMetaDesc} /> */}
    </Head>
  );
};

export default HeadSelector;
