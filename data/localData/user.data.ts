import {  UserProfileType } from "@/interfaces/userData.interface";
import { formatDate } from "@/utils/formatdate.util";

export const userDataArrFunc = (props: UserProfileType) => [
  { label: "Username", data: props?.username || "", errMsg: "", show: true },
  { label: "Email", data: props?.email || "", errMsg: "", show: true },
  {
    label: "Gender",
    data: props?.gender,
    errMsg: "",
    show: true,
  },
  {
    label: "Date Created",
    data: formatDate(props?.createAt || `${new Date()}`),
    errMsg: "",
    show: true,
  },
];

export const passwordInput = [
  { label: "Current Password", data: "", errMsg: "", show: true },
  {
    label: "New Password",
    data: "",
    errMsg: "Password length must be 6 or more",
    show: true,
  },
  {
    label: "Confirm Password",
    data: "",
    errMsg: "Password does not match",
    show: true,
  },
];

export const genderOpts = [
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" },
];
