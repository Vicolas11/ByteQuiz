import { QuestionResp } from "@/interfaces/response.interface";
import { constant } from "@/configs/constant.config";
import { verifyToken } from "../../utils/jwt.util";
import { envConfig } from "@/configs/env.config";
import { cookies } from "next/headers";

const { prodURL, devURL } = constant;
const { dev } = envConfig;
const baseURL = dev ? devURL : prodURL;

export const getFeedback = async (id: string) => {
  const token = cookies().get("token")?.value;
  const authToken = verifyToken(token);
  let queryString = `api/feedback/${id}`;

  if (!authToken) {
    return null;
  }

  try {
    const response = await fetch(`${baseURL}/${queryString}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      cache: "force-cache",
      next: { tags: ["feedback"] },
    });

    const data = await response.json();

    if (data.error || !data.status)
      return {
        status: false,
        message: "Error occurred while fetching",
        data: null,
        error: data.error,
        totalCount: 0,
      };

    return {
      status: data.status,
      message: data.message,
      data: data.data as Array<QuestionResp>,
      error: null,
    };
  } catch (error) {
    return {
      status: false,
      message: "Error occurred while fetching",
      data: null,
      error: error,
      totalCount: 0,
    };
  }
};
