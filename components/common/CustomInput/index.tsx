"use client";
import { InputHTMLAttributes, useState } from "react";
import { FaUnlock, FaLock } from "react-icons/fa";
import styles from "./input.module.scss";

interface InputType extends InputHTMLAttributes<HTMLInputElement> {
  xtraStyle?: string | undefined;
  showPostIcon?: boolean;
  isError?: boolean,
  errMsg?: string,
}

export const CustomInput = ({
  id,
  type,
  value,
  xtraStyle,
  isError = false,
  showPostIcon = false,  
  errMsg,
  ...rest
}: InputType) => {
  const [showPwd, setShowPwd] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.inputContainer}>
        <input
          required
          type={showPostIcon ? (showPwd ? "text" : "password") : type}
          value={value ? value : ""}
          className={`${styles.input} ${isError ? styles.errInput : ""} ${xtraStyle}`}
          {...rest}
        />
        {showPostIcon && (
          <label htmlFor={id}>
            {showPwd ? (
              <span onClick={() => setShowPwd((prev) => !prev)}>
                <FaUnlock className={styles.unlockIcon} />
              </span>
            ) : (
              <span onClick={() => setShowPwd((prev) => !prev)}>
                <FaLock className={styles.unlockIcon} />
              </span>
            )}
          </label>
        )}
      </div>
      {isError && (
        <p className={styles.errMsg}>
          {errMsg ? errMsg : "Invalid input value!"}
        </p>
      )}
    </div>
  );
};
