import BillProps from "../interfaces/BillProps";
import Props from "../interfaces/ChildrenProps";

function DemocratCard({ bill, children }: BillProps) {
  return <div className="democrat-card">{children}</div>;
}

export default DemocratCard;
