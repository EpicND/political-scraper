import BillProps from "../interfaces/BillProps";
import Props from "../interfaces/ChildrenProps";

function IndependentCard({ bill, children }: BillProps) {
  return <div className="independent-card">{children}</div>;
}

export default IndependentCard;
