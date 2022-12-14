import Head from "next/head";
import { getData } from "../bin/api/requests";
import GenerateBillCards from "../components/GenerateBillCards";
import Bill from "../interfaces/Bill";
import styles from "../styles/Index.module.css";

const key = process.env.LOC_API_KEY;

export async function getServerSideProps() {
  const enactedBillArr: Array<Bill> = await getData("enacted");
  const proposedBillArr: Array<Bill> = await getData("updated");
  return { props: { enactedBills: enactedBillArr, proposedBills: proposedBillArr  } };
}

export default function Home({ enactedBills, proposedBills }: any) {
  return (
    <div>
      <Head>
        <title> Politics Scraper </title>
        <meta name="description" content="Political Scraper" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Congress Cache</h1>
        <h1 className={styles.subtitle}> Enacted </h1>
        <div className={styles.cardContainer}>
          {GenerateBillCards(enactedBills)}
        </div>
        <h1 className={styles.subtitle}> In Progress </h1>
        <div className={styles.cardContainer}>
          {GenerateBillCards(proposedBills)}
        </div>
      </main>
    </div>
  );
}
