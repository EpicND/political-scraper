import BillProps from "../interfaces/BillProps";
import Props from "../interfaces/ChildrenProps";
import styles from "../styles/Card.module.css";

function IndependentCard({ bill, color }: BillProps) {
  return <div className={styles.card}> 
          <h3>{bill["bill"]["title"]}</h3>
          <h4>{bill["party"]}</h4>
          <div dangerouslySetInnerHTML={{ __html: bill["text"] }}></div>
    </div>;
}

export default IndependentCard;
