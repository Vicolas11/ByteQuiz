"use client";
import { PropagateLoader } from "react-spinners";
import styles from "./styles.module.scss";

export default function ShowLoader() {
  return (
    <div className={styles.loader}>
      <PropagateLoader color="#FF9400" size={10} />
    </div>
  );
}
