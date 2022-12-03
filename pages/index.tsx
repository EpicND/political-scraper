import Head from "next/head";
import Image from "next/image";
import { getData } from "../bin/api/requests";
import SortedCards from "../components/SortedCards";
import Bill from "../interfaces/Bill";
import styles from "../styles/Index.module.css";

const key = process.env.LOC_API_KEY;

export async function getServerSideProps() {
  const billArr: Array<Bill> = await getData();
  return { props: { body: billArr } };
}

export default function Home({ body }: any) {
  return (
    <div>
      <Head>
        <title> Politics Scraper </title>
        <meta name="description" content="Political Scraper" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Congress Cache</h1>
        <div className={styles.cardContainer}>
          {SortedCards(body)}
        </div>
      </main>
    </div>
  );
}
