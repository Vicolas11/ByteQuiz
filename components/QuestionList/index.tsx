import { optArr } from "@/utils/data";
import { useState } from "react";
import { CustomInput } from "../common/CustomInput";
import styles from "./questionlist.module.scss";

const QuestionList = () => {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className={styles.optionsBox}>
      <h4>Enter your options here and check the correct option</h4>
      <ul className={styles.optList}>
        {optArr.map(({ name, ph, opt }, i) => (
          <li key={i}>
            <button
              className={`${styles.btnOpt} ${
                selected === opt ? styles.active : ""
              }`}
              onClick={() => setSelected(opt)}
            >
              {name}
            </button>
            <CustomInput placeholder={ph} xtraStyle={styles.input} />
          </li>
        ))}
      </ul>
      <div className={styles.time_score}>
        <div className={styles.time}>
          <label htmlFor="time">Time (seconds)</label>
          <CustomInput
            id="time"
            type="number"
            placeholder="Allocate time in seconds"
            xtraStyle={styles.input}
          />
        </div>
        <div className={styles.score}>
          <label htmlFor="score">Scores</label>
          <CustomInput
            id="score"
            type="number"
            placeholder="Question score"
            xtraStyle={styles.input}
          />
        </div>
      </div>
    </div>
  );
};

export default QuestionList;
