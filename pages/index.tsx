import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Index.module.css";

const key = process.env.LOC_API_KEY;

export async function getServerSideProps() {
  var billArr = [];

  const response = await fetch(
    "https://api.congress.gov/v3/summaries?format=json&limit=100" +
      "&api_key=" +
      key
  );
  const responseBody: any = await response.json();
  for (var x in responseBody["summaries"]) {
    const coSponsors = await fetch(
      `https://api.congress.gov/v3/bill/${responseBody["summaries"][x]["bill"]["congress"]}/${responseBody["summaries"][x]["bill"]["type"]}/${responseBody["summaries"][x]["bill"]["number"]}/cosponsors?format=json&api_key=${key}`
    );
    const coSponsorsList: any = await coSponsors.json();

    var republicans = 0;
    var democrats = 0;
    var independents = 0;
    if (
      coSponsorsList["cosponsors"]?.length > 0 &&
      !responseBody["summaries"][x]["bill"]["title"]?.includes("designate")
    ) {
      for (var y in coSponsorsList["cosponsors"]) {
        switch (coSponsorsList["cosponsors"][y]["party"]) {
          case "R":
            republicans++;
            break;
          case "D":
            democrats++;
            break;
          case "I":
            independents++;
            break;
        }
      }

      var tempBill = responseBody["summaries"][x];

      if (democrats == 0) {
        tempBill["party"] = "R";
      } else if (republicans == 0) {
        tempBill["party"] = "D";
      } else {
        tempBill["party"] = "BP";
      }

      billArr.push(tempBill);
    }
  }

  return { props: { body: billArr } };
}

export default function Home({ body }: any) {
  console.log(body[1]);

  return (
    <div>
      <Head>
        <title> Politics Scraper </title>
        <meta name="description" content="Political Scraper" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1>Politics Scraper</h1>

        {body.map((bill: any) => {
          return (
            <div className={styles.card} key={bill["bill"]["title"]}>
              <h3>{bill["bill"]["title"]}</h3>
              <h4>{bill["party"]}</h4>
              <div dangerouslySetInnerHTML={{ __html: bill["text"] }}></div>
            </div>
          );
        })}

        <p>Politics</p>
      </main>
    </div>
  );
}
