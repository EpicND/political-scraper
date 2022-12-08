import { ReactElement } from "react";
import BillProps from "../interfaces/BillProps";
import styles from "../styles/Card.module.css";
import { motion } from "framer-motion";
import { useRef } from "react";

function VariableCard({ bill, color }: BillProps) {

  return <motion.div 
    className={styles.card} 
    style={{backgroundColor: color}} 

    // ANIMATION STUFF
    whileHover={{ marginTop: "-20px" }}
    onHoverStart={e => {}}
    onHoverEnd={e => {}}
  > 
          <a> {bill["number"]}</a>
          <a className={styles.title}>{bill["short_title"].substring(0, 60)}{bill["short_title"].length < 60 ? "" : "..."} </a>
          <div className={color == "#FFFFFF" ? styles.subtitleBlack : styles.subtitleWhite }> {bill["summary"].substring(0, 120) + "..." }</div>
    </motion.div>;
}

export default VariableCard;
