import { ReactElement } from "react";
import BillProps from "../interfaces/BillProps";
import DemocratCard from "./DemocratCard";
import IndependentCard from "./IndependentCard";
import RepublicanCard from "./RepublicanCard";

function VariableCard({ bill, children }: BillProps) {
  var card: ReactElement;
  if (bill.party == "D") card = <DemocratCard bill={bill} />;
  else if (bill.party == "R") card = <RepublicanCard bill={bill} />;
  else card = <IndependentCard bill={bill} />;

  return card;
}

export default VariableCard;
