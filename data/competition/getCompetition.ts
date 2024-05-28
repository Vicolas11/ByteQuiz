import {
  AllCompetitionsResp,
  CompetitionResp,
} from "@/interfaces/response.interface";
import { QueryParams } from "@/interfaces/others.interface";
import { constant } from "@/configs/constant.config";
import { verifyToken } from "../../utils/jwt.util";
import { envConfig } from "@/configs/env.config";
import { cookies } from "next/headers";

const { prodURL, devURL } = constant;
const { dev } = envConfig;
const baseURL = dev ? devURL : prodURL;

export const getAllCompetitions = async (data: QueryParams) => {
  const token = cookies().get("token")?.value;
  const authToken = verifyToken(token);
  let queryString = `api/competitions`;
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
    const response = await fetch(`${baseURL}/${queryString}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      next: { revalidate: 60, tags: ["competitions"] },
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
      data: data.data as Array<AllCompetitionsResp>,
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

export const getACompetition = async (id: string) => {
  const token = cookies().get("token")?.value;
  const authToken = verifyToken(token);

  if (!authToken) {
    return null;
  }

  try {
    const response = await fetch(`${baseURL}/api/competitions/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      cache: "force-cache",
      next: { tags: ["competition"] },
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
      message: data.message,
      data: {
        ...data.data,
        hasJoined: data.other.hasJoined,
        hasSubmitted: data.other.hasSubmitted,
      } as CompetitionResp,
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
