import BillProps from "../interfaces/BillProps";
import Props from "../interfaces/ChildrenProps";

function RepublicanCard({ bill, children }: BillProps) {
  return <div className="republican-card">{children}</div>;
}

export default RepublicanCard;
