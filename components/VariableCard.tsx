import { ReactElement } from "react";
import BillProps from "../interfaces/BillProps";
import styles from "../styles/Card.module.css";
import { motion } from "framer-motion";

function VariableCard({ bill, color }: BillProps) {
  return <motion.div 
    className={styles.card} 
    style={{backgroundColor: color}} 

    // ANIMATION STUFF
    whileHover={{ marginTop: "-20px" }}
    onHoverStart={e => {}}
    onHoverEnd={e => {}}
  > 
          <a className={styles.title}>{bill["bill"]["title"]}</a>
          <div className={color == "#FFFFFF" ? styles.subtitleBlack : styles.subtitleWhite } dangerouslySetInnerHTML={{ __html: bill["text"].substring(0, 120) + "..." }}></div>
    </motion.div>;
}

export default VariableCard;
