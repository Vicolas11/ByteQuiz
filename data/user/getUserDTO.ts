
import { UserProfile } from "@/interfaces/userData.interface";
import { constant } from "@/configs/constant.config";
import { verifyToken } from "../../utils/jwt.util";
import { envConfig } from "@/configs/env.config";
import { cookies } from "next/headers";
import { getUser } from "./getUser";

const { prodURL, devURL } = constant;
const { dev } = envConfig;
const baseURL = dev ? devURL : prodURL;

export const getUserDTO = async () => {
  const token = cookies().get("token")?.value;
  const authToken = verifyToken(token);

  if (!authToken) {
    return null;
  }

  const user = await getUser();

  try {
    const response = await fetch(`${baseURL}/api/auth/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      cache: "force-cache",
      next: { tags: ["userData"] },
    });
    const data = await response.json();
    if (data.error) return { status: false, data: null, error: data.error };

    return {
      status: true,
      data: { ...data.data, role: user?.role } as UserProfile,
      error: null,
    };
  } catch (error) {
    return { status: false, data: null, error: error };
  }
};
