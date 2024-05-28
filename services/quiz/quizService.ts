import { constant } from "@/configs/constant.config";
import { envConfig } from "@/configs/env.config";
import { verifyToken } from "@/utils/jwt.util";
import { cookies } from "next/headers";

const { prodURL, devURL } = constant;
const { dev } = envConfig;
const baseURL = dev ? devURL : prodURL;

export async function createQuizService(userData: any) {
  const url = new URL("api/quiz", baseURL);
  const token = cookies().get("token")?.value;
  const authToken = verifyToken(token);
  const isEmpty = Object.values(userData).some((val) => val === "");

  if (isEmpty) {
    return;
  }

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({ ...userData }),
      cache: "no-cache",
    });

    return response.json();
  } catch (error) {
    console.error("Create Quiz Service Error:", error);
    return {
      data: {
        status: false,
        message: "Create Quiz Service Error",
      },
    };
  }
}

export async function submitQuizService(userData: any) {
  const url = new URL("api/quiz/submit", baseURL);
  const token = cookies().get("token")?.value;
  const authToken = verifyToken(token);
  const isEmpty = Object.values(userData).some((val) => val === "");

  if (isEmpty) {
    return;
  }

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({ ...userData }),
      cache: "no-cache",
    });

    return response.json();
  } catch (error) {
    console.error("Submit Quiz Service Error:", error);
    return {
      data: {
        status: false,
        message: "Submit Quiz Service Error",
      },
    };
  }
}
