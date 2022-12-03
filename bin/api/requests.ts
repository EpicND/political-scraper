import Bill from "../../interfaces/Bill";
import BillSummaries from "../../interfaces/BillSummaries";

async function getData(): Promise<Array<Bill>> {

  var billArr: Array<Bill> = [];
  const bills: BillSummaries = await getBillsWithSummaries(10, 2);

  for (var bill in bills?.summaries) {
    var currentBill = bills.summaries[bill]["bill"];
    const coSponsors = await fetch(
      `https://api.congress.gov/v3/bill/${currentBill.congress}/${currentBill.type}/${currentBill.number}/cosponsors?format=json&api_key=${process.env.LOC_API_KEY}`
    );
    const coSponsorsList: any = await coSponsors.json();

    var republicans = 0;
    var democrats = 0;
    var independents = 0;
    if (
      coSponsorsList["cosponsors"]?.length > 0 &&
      !currentBill["title"]?.includes("designate")
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

      var tempBill = bills["summaries"][bill];

      if (democrats == 0 && republicans != 0) {
        tempBill.party = "R";
      } else if (republicans == 0 && democrats != 0) {
        tempBill.party = "D";
      } else {
        tempBill.party = "BP";
      }

      billArr.push(tempBill);
    }
  }

  return billArr;
}

async function getBillsWithSummaries(limit: number, days: number) {

  // Get bills from the last x days
  var d = new Date();
  d.setDate(d.getDate()-days);

  const response = await fetch(
    `https://api.congress.gov/v3/summaries?${new URLSearchParams({
      format: "json",
      limit: `${limit}`,
      api_key: `${process.env.LOC_API_KEY}`,
      fromDateTime: `${d.toJSON().slice(0, 19) + "Z"}`
    })}`
  );
  const bills: BillSummaries = await response.json();

  return bills;
}

export { getData };
