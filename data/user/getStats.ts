
import { GetStatsResp } from "@/interfaces/response.interface";
import { constant } from "@/configs/constant.config";
import { envConfig } from "@/configs/env.config";

const { prodURL, devURL } = constant;
const { dev } = envConfig;
const baseURL = dev ? devURL : prodURL;

export const getStats = async () => {
  try {
    const response = await fetch(
      `${baseURL}/api/auth/stats`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        next: { revalidate: 60, tags: ["stats"] },
      }
    );
    const data = await response.json();
    if (data.error) return { status: false, data: null, error: data.error };

    return {
      status: true,
      message: data.message,
      code: data.code,
      data: { ...data.data } as GetStatsResp,
      error: null,
    };
  } catch (error) {
    return { status: false, data: null, error: error };
  }
};
