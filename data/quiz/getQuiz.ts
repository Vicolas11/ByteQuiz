import { QuizResp } from "@/interfaces/response.interface";
import { constant } from "@/configs/constant.config";
import { verifyToken } from "../../utils/jwt.util";
import { envConfig } from "@/configs/env.config";
import { cookies } from "next/headers";

const { prodURL, devURL } = constant;
const { dev } = envConfig;
const baseURL = dev ? devURL : prodURL;

export const getAQuiz = async (id: string) => {
  const token = cookies().get("token")?.value;
  const authToken = verifyToken(token);

  if (!authToken) {
    return null;
  }

  try {
    const response = await fetch(`${baseURL}/api/quiz/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      cache: "force-cache",
      next: { tags: ["quiz"] },
    });

    const data = await response.json();

    if (data.error || !data.status)
      return {
        status: false,
        message: "Error occurred while fetching",
        data: null,
        error: data.error,
      };

    return {
      status: data.status,
      code: data.code,
      message: data.message,
      data: data.data as QuizResp,
      error: null,
    };
  } catch (error) {
    return {
      status: false,
      message: "Error occurred while fetching",
      data: null,
      error: error,
    };
  }
};
