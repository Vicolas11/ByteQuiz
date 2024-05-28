import { Role } from "./others.interface";

export interface LoginUserParams {
  email: string;
  password: string;
}

export interface RegisterUserParams {
  username: string;
  email: string;
  password: string;
  gender: Role
}

export interface ChangePasswordParams {
  id: string;
  oldpassword: string;
  newpassword: string;
}

export interface ForgetPasswordParams {
  email: string;
}

export interface ResetPasswordParams {
  otp: string;
  email: string;
  password: string;
}
