import { CustomRadioProps } from "@/interfaces/props.interface";
import styles from "./radiobtn.module.scss";
import { FaCheck } from "react-icons/fa";
import { useState } from "react";

const CustomRadio = ({
  options,
  onSelectOpt,
  selectedOption,
}: CustomRadioProps) => {
  const [selectOpt, setSelectOpt] = useState<string | null>(selectedOption);

  const handleSelect = (label: string, isCorrect: boolean) => {
    setSelectOpt(label);
    onSelectOpt(label, isCorrect);
  };

  return (
    <>
      {options && options.map(({ id, label, value, isCorrect }) => (
        <label
          key={id}
          htmlFor={id}
          className={`${styles.cust_radio_lbl} ${
            selectOpt === label ? styles.active : ""
          }`}
        >
          <div className={styles.label_text}>
            <h3>{`${label}. ${value}`}</h3>
          </div>
          <div className={styles.check_wrapper}>
            <input
              type="radio"
              id={id}
              name="radio-options"
              value={id}
              className={styles.checkBox}
              checked={selectOpt === label}
              onChange={() => handleSelect(label, isCorrect)}
            />
            <FaCheck
              className={styles.check_icon_radio}
              color={selectOpt === label ? "white" : ""}
            />
          </div>
        </label>
      ))}
    </>
  );
};

export default CustomRadio;
