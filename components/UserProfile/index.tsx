"use client";
import { passwordInput, userDataArrFunc } from "@/data/localData/user.data";
import {
  ChangeEvent,
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { InputIsValidType } from "@/interfaces/others.interface";
import { UserProfileProps } from "@/interfaces/props.interface";
import { CustomInput } from "@/components/common/CustomInput";
import { isValidCheck } from "@/utils/validinput.util";
import { CustomBtn } from "../common/CustomBtn";
import styles from "./account.module.scss";
import { useFormState } from "react-dom";
import {
  changePasswordAction,
  updateUserAction,
} from "@/services/auth/authActions";
import toast from "react-hot-toast";
import Image from "next/image";

export default function UserProfile({ userData, scroll }: UserProfileProps) {
  const [state, action] = useFormState(changePasswordAction, { data: null });
  const [formState, formAction] = useFormState(updateUserAction, {
    data: null,
  });

  const user = userDataArrFunc(userData);

  const [inputValue, setInputValue] = useState(
    Object.fromEntries(
      user.filter((val) => val.show).map(({ label, data }) => [label, data])
    )
  );

  const bottomRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    if (scroll) bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [scroll]);

  const [pwdInputValue, setPwdInputValue] = useState(
    Object.fromEntries(passwordInput.map((val) => [val.label, ""]))
  );

  const [isValidInput, setIsValidInput] = useState<InputIsValidType>({
    "New Password": false,
    "Confirm Password": false,
  });

  const disableSave = Object.values(inputValue).some((val) => val === "");

  const disableUpd =
    Object.values(pwdInputValue).some((val) => val === "") ||
    isValidInput["New Password"] ||
    isValidInput["Confirm Password"] ||
    pwdInputValue["New Password"] !== pwdInputValue["Confirm Password"];

  const handleOnChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = evt.target;
    if (
      ["Confirm Password", "New Password", "Current Password"].includes(name)
    ) {
      setPwdInputValue({ ...pwdInputValue, [name]: value });
    } else {
      setInputValue({ ...inputValue, [name]: value });
    }

    // Check Password Validity
    setIsValidInput({
      ...isValidInput,
      [name]: isValidCheck(name, value, pwdInputValue),
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [scrollToBottom]);

  useEffect(() => {
    if (state.data) {
      if (state.data.status) {
        setPwdInputValue({
          "Current Password": "",
          "New Password": "",
          "Confirm Password": "",
        });
        toast.success(state.data.message);
      } else {
        toast.error(state.data.message);
      }
    }
  }, [state.data]);

  useEffect(() => {
    if (formState.data) {
      if (formState.data.status) {
        toast.success(formState.data.message);
      } else {
        toast.error(formState.data.message);
      }
    }
  }, [formState.data]);

  return (
    <div className={styles.container}>
      <form action={formAction}>
        <h1 className={styles.title}>User Profile</h1>
        <Suspense>
          <ul className={styles.userInfo}>
            {user.map(
              ({ label, show }, idx) =>
                show && (
                  <li key={idx}>
                    <label htmlFor={label}>{label}</label>
                    <CustomInput
                      id={label}
                      name={label}
                      value={inputValue[label]}
                      onChange={handleOnChange}
                      type={idx === 1 ? "email" : "text"}
                      disabled={["Email", "Gender", "Date Created"].includes(
                        label
                      )}
                      xtraStyle={undefined}
                    />
                  </li>
                )
            )}
          </ul>
        </Suspense>
        <div className={styles.btnContainer}>
          <CustomBtn
            type="submit"
            name={"Update"}
            xtraStyle={styles.btn}
            disabled={disableSave}
          />
        </div>
      </form>

      <form action={action}>
        <h1 className={styles.title}>Change Password</h1>
        <ul className={styles.userInfo}>
          {passwordInput.map(({ label, errMsg }, idx) => (
            <li key={idx}>
              <label htmlFor={label}>{label}</label>
              <CustomInput
                id={label}
                type="password"
                isError={isValidInput[label]}
                errMsg={errMsg}
                name={label}
                value={pwdInputValue[label]}
                onChange={handleOnChange}
                showPostIcon
                xtraStyle={undefined}
              />
            </li>
          ))}
        </ul>

        <div className={styles.btnContainer}>
          <CustomBtn
            type="submit"
            name="Change Password"
            xtraStyle={styles.btn}
            disabled={disableUpd}
          />
        </div>
      </form>

      {userData?.achievement && userData.achievement.length > 0 && (
        <div className={styles.achievement}>
          <h1 className={styles.title}>Achievements</h1>
          <Suspense fallback={<h2>Loading...</h2>}>
            <ul>
              {userData?.achievement.map((data, idx) => (
                <li key={idx}>
                  <div className={styles.medalImgContainer}>
                    <Image src={data.medalImg} alt="medal" fill />
                  </div>
                  <h3>{data.title}</h3>
                </li>
              ))}
            </ul>
          </Suspense>
        </div>
      )}
      <div ref={bottomRef} />
    </div>
  );
}
