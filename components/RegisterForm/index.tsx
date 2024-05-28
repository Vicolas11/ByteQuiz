"use client";
import { isValidAll, isValidEmail } from "@/utils/validinput.util";
import { registerUserAction } from "@/services/auth/authActions";
import React, { ChangeEvent, useEffect, useState } from "react";
import { inputValArr } from "@/data/localData/components.data";
import { genderOpts } from "@/data/localData/selectopts.data";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import { redirect, useRouter } from "next/navigation";
import { CustomInput } from "../common/CustomInput";
import { IOpt } from "@/interfaces/props.interface";
import { CustomBtn } from "../common/CustomBtn";
import CustomSelect from "../CustomSelect";
import { useFormState } from "react-dom";
import styles from "./form.module.scss";
import {
  InputIsValidType,
  InputValueType,
} from "@/interfaces/others.interface";
import toast from "react-hot-toast";

export const RegisterForm = () => {
  const [state, action] = useFormState(registerUserAction, { data: null });
  const [selectedOpt, setSelectedOpt] = useState<IOpt | null>(null);
  const router = useRouter();

  const onSelect = (newVal: IOpt) => {
    setSelectedOpt(newVal);
  };

  const [inputValue, setInputValue] = useState<InputValueType>({
    username: "",
    email: "",
    password: "",
  });

  const { username, email, password } = inputValue;

  const [isValidInput, setIsValidInput] = useState<InputIsValidType>({
    username: false,
    email: false,
    password: false,
  });

  const handleOnChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;
    setInputValue({ ...inputValue, [name]: value });

    // Check Input Validation On Input Change
    setIsValidInput(
      value.length > 0
        ? {
            ...isValidInput,
            [name]: !isValidAll(value, name as string),
          }
        : { username: false, email: false, password: false }
    );
  };

  const disable =
    !isValidEmail(email) ||
    username.length < 2 ||
    password.length < 6 ||
    !selectedOpt;

  useEffect(() => {
    if (state.data) {
      if (state.data.status) {
        toast.success(state.data.message);
        redirect("/login");
      } else {
        toast.error(state.data.message);
      }
    }
  }, [state.data]);

  const pathName = (name: string) => {
    router.push(name);
  };

  return (
    <form className={styles.form} action={action}>
      <h4 className={styles.title}>Register</h4>
      <p>Please register now to learn more</p>
      {/* <CustomBtn
        name={`Sign up with Google`}
        icon={<FaGoogle size={18} />}
        xtraStyle={styles.gbtn}
        dontShow={false}
      /> */}

      {/* <CustomBtn
        name={`Sign up with Facebook`}
        icon={<FaFacebook size={20} />}
        xtraStyle={styles.fbtn}
        dontShow={false}
      /> */}

      {/* <div className={styles.lineContainer}>
        <h3>OR</h3>
      </div> */}

      <CustomSelect
        options={genderOpts}
        placeholder={`Select Gender`}
        onSelect={onSelect}
      />

      <input
        type="hidden"
        name="gender"
        defaultValue={`${selectedOpt?.value}`}
      />

      {inputValArr.map(
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
              xtraStyle={styles.emailInput}
            />
          )
      )}

      <CustomBtn name={`Sign up with Credentials`} disabled={disable} />

      <p>
        I already have an account!{" "}
        <button type="button" onClick={() => pathName("login")}>
          Login
        </button>
      </p>
    </form>
  );
};
