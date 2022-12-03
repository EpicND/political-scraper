import Bill from "../interfaces/Bill";
import VariableCard from "./VariableCard";

function SortedCards(bills: Array<Bill>) {
  const cardColors = new Map();

  cardColors.set('D', "#70C2FF");
  cardColors.set('R', "#F06B6B");
  cardColors.set('BP', "#FFFFFF");
  
  return bills.map((bill) => {
    return <VariableCard bill={bill} color={cardColors.get(bill.party)} key={bill.bill.number}  />;
  });
}

export default SortedCards;
