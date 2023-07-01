import Head from "next/head";

export const HeadSelector = () => {
  return (
    <Head>
      <title>Routist | kolo</title>
      {/* <link rel="icon" href="/icons/icon.svg" /> */}
      <meta name="author" content="Pavel Zapletal" />
      <meta
        name="keywords"
        content="routist, cycklistika, kolo, cyklovýlety, cyklovylety, cykloturismus, kolo výlety, kolo výlety, turistika, výlety, výlety po okolí"
      />
      <link rel="canonical" href={`https://www.routist.cz/`} />
      <meta
        name="description"
        content="Turistické trasy pro všechny nadšené cyklisty / cyklistky. Podělte se s ostatními o svá oblíbená místa a nebo se nechte inspirovat jinými."
      />
    </Head>
  );
};

export default HeadSelector;
