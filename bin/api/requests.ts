import Bill from "../../interfaces/Bill";
import BillSummaries from "../../interfaces/BillSummaries";

var currentCongress: number = 117;

async function getData(): Promise<Array<Bill>> {

  const response = await fetch(
    `https://api.propublica.org/congress/v1/${currentCongress}/both/bills/enacted.json?`, {
      headers: {
        "X-API-Key": `${process.env.PP_API_KEY}`
      }
    });

  const bills: any = await response.json();
  const billSummaries: Array<Bill> = bills["results"][0]["bills"];

  var democratSponsors:number;
  var republicanSponsors: number;
  var currentBill:Bill;

  for (var bill:number = 0; bill < billSummaries.length; bill++) {

    currentBill = billSummaries[bill];
    democratSponsors = currentBill["cosponsors_by_party"]["D"];
    republicanSponsors = currentBill["cosponsors_by_party"]["R"];

    if(typeof democratSponsors == "undefined") democratSponsors = 0;
    if(typeof republicanSponsors == "undefined") republicanSponsors = 0;
    
    if (democratSponsors == 0 && republicanSponsors != 0) {
      currentBill["party"] = "R";
    } else if (republicanSponsors == 0 && democratSponsors != 0) {
      currentBill["party"] = "D";
    } else {
      currentBill["party"] = "BP";
    }

    if(currentBill["summary"].startsWith(currentBill["short_title"])) currentBill["summary"] = currentBill["summary"].substring(currentBill["short_title"].length); 

    billSummaries[bill] = currentBill;
  }

  return billSummaries;
}

export { getData };
