import Bill from "../interfaces/Bill";
import VariableCard from "./VariableCard";


const cardColors = new Map();
const blacklistedWords = ["designate", "name", "amend"];

cardColors.set('D', "#70C2FF");
cardColors.set('R', "#F06B6B");
cardColors.set('BP', "#FFFFFF");

function GenerateBillCards(bills: Array<Bill>) {

  return bills.map((bill) => {
    if(!blacklistedWords.some(v => bill["title"].includes(v))) {
      return <VariableCard bill={bill} color={cardColors.get(bill.party)} key={bill.bill_id}  />;
    }
  });
}

export default GenerateBillCards;
