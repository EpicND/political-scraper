import Head from "next/head";
import Image from "next/image";
import { getData } from "../bin/api/requests";
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
        <h1>Politics Scraper</h1>
        <div className={styles.cardContainer}>
          {body.map((bill: any) => {
            return (
              <div className={styles.card} key={bill["bill"]["title"]}>
                <h3>{bill["bill"]["title"]}</h3>
                <h4>{bill["party"]}</h4>
                <div dangerouslySetInnerHTML={{ __html: bill["text"] }}></div>
              </div>
            );
          })}
        </div>
        <p>Politics</p>
      </main>
    </div>
  );
}
