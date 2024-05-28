"use client";
import { ButtonHTMLAttributes } from "react";
import { PuffLoader } from "react-spinners";
import { useFormStatus } from "react-dom";
import styles from "./btn.module.scss";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactElement;
  xtraStyle?: string | undefined;
  dontShow?: boolean;
  isDeleteBtn?: boolean;
  showLoader?: boolean;
}

export const CustomBtn = ({
  xtraStyle,
  isDeleteBtn,
  disabled,
  dontShow = true,
  showLoader = false,
  icon,
  name,
  ...rest
}: Props) => {
  const { pending } = useFormStatus();

  return (
    <button
      className={`${styles.button} ${xtraStyle}`}
      disabled={disabled || pending}
      {...rest}
    >
      <>
        {icon && icon}
        {dontShow &&
          (showLoader ||
            (pending && (
              <PuffLoader
                color={isDeleteBtn ? "#ffffff" : "#FF9400"}
                size={20}
              />
            )))}
        {name}
      </>
    </button>
  );
};
