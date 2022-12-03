import Bill from "../interfaces/Bill";
import RepublicanCard from "./RepublicanCard";
import DemocratCard from "./DemocratCard";
import IndependentCard from "./IndependentCard";

function SortedCards(bills: Array<Bill>) {
  return bills.map((bill) => {
    return <div key={bill.bill.number}></div>;
  });
}

export default SortedCards;
