"use client";
import { isValidAll, isValidEmail } from "@/utils/validinput.util";
import React, { ChangeEvent, useEffect, useState } from "react";
import { inputValArr } from "@/data/localData/components.data";
import { loginUserAction } from "@/services/auth/authActions";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import { redirect, useRouter } from "next/navigation";
import { CustomInput } from "../common/CustomInput";
import { CustomBtn } from "../common/CustomBtn";
import { useFormState } from "react-dom";
import styles from "./form.module.scss";
import {
  InputValueType,
  InputIsValidType,
} from "@/interfaces/others.interface";
import toast from "react-hot-toast";

export const LoginForm = () => {
  const [state, action] = useFormState(loginUserAction, { data: null });
  const [inputValue, setInputValue] = useState<InputValueType>({
    email: "",
    password: "",
  });
  const [isValidInput, setIsValidInput] = useState<InputIsValidType>({
    email: false,
    password: false,
  });
  const { email, password } = inputValue;
  const disable = !isValidEmail(email) || password === "";
  const router = useRouter();

  const pathName = (name: string) => {
    router.push(name);
  };

  useEffect(() => {
    if (state.data) {
      if (state.data.status) {
        toast.success(state.data.message);
        redirect("/features");
      } else {
        toast.error(state.data.message);
      }
    }
  }, [state.data]);

  const handleOnChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;
    setInputValue({ ...inputValue, [name]: value });
    // Check Input Validation On Input Change
    if (name !== "password")
      setIsValidInput(
        value.length > 0
          ? {
              ...isValidInput,
              [name]: !isValidAll(value, name as string),
            }
          : { email: false, password: false }
      );
  };

  return (
    <form className={styles.form} action={action}>
      <h4 className={styles.title}>Login</h4>
      <p>Welcome back Champ! Please Login</p>

      {/* <CustomBtn
        name={`Sign in with Google`}
        icon={<FaGoogle size={18} />}
        xtraStyle={styles.gbtn}
        dontShow={false}
      /> */}

      {/* <CustomBtn
        name={`Sign in with Facebook`}
        icon={<FaFacebook size={20} />}
        xtraStyle={styles.fbtn}
        dontShow={false}
      /> */}

      {/* <div className={styles.lineContainer}>
        <h3>OR</h3>
      </div> */}

      {inputValArr
        .filter((i) => ["email", "password"].includes(i.name))
        .map(
          ({ type, ph, name, show, errMsg }, idx) =>
            show && (
              <CustomInput
                key={idx}
                type={type}
                id={name}
                placeholder={ph}
                isError={isValidInput[name]}
                errMsg={errMsg}
                name={name}
                value={inputValue[name]}
                onChange={handleOnChange}
                showPostIcon={type === "password"}
                required
              />
            )
        )}

      <CustomBtn name={`Sign in with Credentials`} disabled={disable} />

      <p>
        {"Don't have an account? "}
        <button type="button" onClick={() => pathName("register")}>
          Register
        </button>
      </p>
    </form>
  );
};
