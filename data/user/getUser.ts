"use server";
import { DecodedUserType } from "@/interfaces/userData.interface";
import { verifyToken } from "../../utils/jwt.util";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

export const getUser = async () => {
  try {
    const token = cookies().get("token")?.value;
    const getToken = verifyToken(token);

    if (!getToken) {
      return null;
    }

    const decodedToken = jwtDecode<DecodedUserType>(getToken);

    return {
      userId: decodedToken.id as string,
      role: decodedToken.role,
    };
  } catch (error) {
    return null;
  }
};
