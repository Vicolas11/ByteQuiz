import { fetchWithTimeoutAndRetry } from "@/utils/fetchWithRetry.util";
import { GetQuizResp } from "@/interfaces/response.interface";
import { QueryParams } from "@/interfaces/others.interface";
import { constant } from "@/configs/constant.config";
import { verifyToken } from "../../utils/jwt.util";
import { envConfig } from "@/configs/env.config";
import { cookies } from "next/headers";

const { prodURL, devURL } = constant;
const { dev } = envConfig;
const baseURL = dev ? devURL : prodURL;

export const getAllUserQuiz = async (data: QueryParams) => {
  const token = cookies().get("token")?.value;
  const authToken = verifyToken(token);
  let queryString = `api/quiz`;
  const { perPage, currentPage } = data;

  if (perPage) {
    queryString += `?perPage=${perPage}`;
  }

  if (currentPage) {
    queryString += `${perPage ? "&" : "?"}currentPage=${currentPage}`;
  }

  if (!authToken) {
    return null;
  }

  try {
    const response = await fetchWithTimeoutAndRetry(`${baseURL}/${queryString}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      cache: "force-cache",
      next: { tags: ["usersQuiz"] },
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
      data: data.data as Array<GetQuizResp>,
      error: null,
      totalCount: data.other.totalCount as number,
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
