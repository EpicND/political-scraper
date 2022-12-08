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

  for (var bill:number = 0; bill < billSummaries.length; bill++) {

    democratSponsors = billSummaries[bill]["cosponsors_by_party"]["D"];
    republicanSponsors = billSummaries[bill]["cosponsors_by_party"]["R"];

    if(typeof democratSponsors == "undefined") democratSponsors = 0;
    if(typeof republicanSponsors == "undefined") republicanSponsors = 0;
    
    
    if (democratSponsors == 0 && republicanSponsors != 0) {
      billSummaries[bill]["party"] = "R";
    } else if (republicanSponsors == 0 && democratSponsors != 0) {
      billSummaries[bill]["party"] = "D";
    } else {
      billSummaries[bill]["party"] = "BP";
    }
  }
  
  return billSummaries;
}

// async function getBillsWithSummaries(limit: number, days: number) {

//   // Get bills from the last x days
//   var d = new Date();
//   d.setDate(d.getDate()-days);

//   const response = await fetch(
//     `https://api.congress.gov/v3/summaries?${new URLSearchParams({
//       format: "json",
//       limit: `${limit}`,
//       api_key: `${process.env.LOC_API_KEY}`,
//       fromDateTime: `${d.toJSON().slice(0, 19) + "Z"}`
//     })}`
//   );
//   const bills: BillSummaries = await response.json();
//   return bills;
// }


// async function getData(): Promise<Array<Bill>> {

//   var billArr: Array<Bill> = [];
//   const bills: BillSummaries = await getBillsWithSummaries(10, 2);

//   for (var bill in bills.length) {
//     var currentBill = bills[bill]];
//     const coSponsors = await fetch(
//       `https://api.congress.gov/v3/bill/${currentBill.congress}/${currentBill.type}/${currentBill.number}/cosponsors?format=json&api_key=${process.env.LOC_API_KEY}`
//     );
//     const coSponsorsList: any = await coSponsors.json();

//     var republicans = 0;
//     var democrats = 0;
//     var independents = 0;
//     if (
//       coSponsorsList["cosponsors"]?.length > 0 &&
//       !currentBill["title"]?.includes("designate")
//     ) {
//       for (var y in coSponsorsList["cosponsors"]) {
//         switch (coSponsorsList["cosponsors"][y]["party"]) {
//           case "R":
//             republicans++;
//             break;
//           case "D":
//             democrats++;
//             break;
//           case "I":
//             independents++;
//             break;
//         }
//       }

//       var tempBill = bills["summaries"][bill];

//       if (democrats == 0 && republicans != 0) {
//         tempBill.party = "R";
//       } else if (republicans == 0 && democrats != 0) {
//         tempBill.party = "D";
//       } else {
//         tempBill.party = "BP";
//       }

//       billArr.push(tempBill);
//     }
//   }

//   return billArr;
// }



export { getData };
