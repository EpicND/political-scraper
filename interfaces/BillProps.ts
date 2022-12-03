import { ReactNode } from "react";
import Bill from "./Bill";

interface BillProps {
  bill: Bill;
  color?: string;
  children?: ReactNode;
}

export default BillProps;
